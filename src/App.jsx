import React, { useState } from "react";

const App = () => {
  const [photoData, setPhotoData] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = () => {
    setIsCameraOn(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = document.getElementById("camera-preview");
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing user media:", error);
      });
  };

  const takePhoto = () => {
    const video = document.getElementById("camera-preview");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png");
    setPhotoData(data);
    setIsCameraOn(false);
    video.srcObject.getVideoTracks().forEach((track) => track.stop());
  };

  const retakePhoto = () => {
    setPhotoData(null);
    startCamera();
  };

  return (
    <div className="camera-container">
      {!photoData && (
        <div className="camera-preview">
          {isCameraOn ? (
            <video id="camera-preview" autoPlay />
          ) : (
            <button onClick={startCamera}>Start Camera</button>
          )}
        </div>
      )}
      {photoData && (
        <div>
          <img src={photoData} className="captured" alt="Captured" />
          <button id="btn" onClick={retakePhoto}>
            Retake Photo
          </button>
        </div>
      )}
      {isCameraOn && (
        <button id="btn_retake" onClick={takePhoto}>
          Take Photo
        </button>
      )}
    </div>
  );
};

export default App;
