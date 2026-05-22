

"use client"
import React, { useRef } from 'react'
import { useEffect } from 'react';
import *  as faceapi from 'face-api.js';
export default function Webcam() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const startWebcam = async () => {
        try {
            // navigator.mediaDevices.getUserMedia() is a JavaScript method that requests access to a user's local media devices, typically a camera and/or microphone
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          const video = videoRef.current;
          video.srcObject = stream;
      
          video.onloadedmetadata = () => {
            video.play();
            detectFaces();
          };

        } catch (err) {
          console.log("Camera error:", err);
        }
      };
      const loadModels= async()=>{
        try{
await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    
await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

console.log("Models loaded");

      } catch (error) {
        console.log("Model loading error:", error);
      }
    };
    const detectFaces = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
    
      const interval = setInterval(async () => {
        if (!video || video.videoWidth === 0) return;
    
        const detections = await faceapi.detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 416,
            scoreThreshold: 0.3,
          })
        );
    
        console.log("faces:", detections.length);
    
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    
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
      }, []);
   
  
  return (
    <div>
        <p>sjsjjsjsjs</p>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="600"
        height="400"
      />
          <canvas ref={canvasRef} />

    </div>
  )
}
   
