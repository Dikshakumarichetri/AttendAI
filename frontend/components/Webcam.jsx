"use client";

import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

export default function Webcam({ videoRef }) {
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  // Load AI models
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  };

  // Start webcam
  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    const video = videoRef.current;
    if (!video) return;

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
      detectFaces();
    };
  };

  // Draw face box
  const detectFaces = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    intervalRef.current = setInterval(async () => {
      if (!video || video.videoWidth === 0) return;

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 416,
          scoreThreshold: 0.3,
        })
      );

      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      faceapi.matchDimensions(canvas, displaySize);

      const resized = faceapi.resizeResults(detections, displaySize);

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resized);
    }, 300);
  };

  useEffect(() => {
    const setup = async () => {
      await loadModels();
      await startWebcam();
    };

    setup();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "600px" }}>
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="600"
        height="400"
      />

      {/* Canvas overlay (FACE BOX) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}