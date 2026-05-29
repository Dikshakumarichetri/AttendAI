"use client";

import { useEffect } from "react";
import * as faceapi from "face-api.js";

export default function Webcam({ videoRef }) {
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  };

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    const video = videoRef.current;
    if (!video) return;

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  };

  useEffect(() => {
    loadModels();
    startWebcam();
  }, []); 

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      width="600"
      height="400"
    />
  );
}