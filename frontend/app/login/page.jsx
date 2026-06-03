"use client";

import { useRef, useState } from "react";
import Webcam from "@/components/Webcam";
import * as faceapi from "face-api.js";

export default function Login() {
  const videoRef = useRef(null);

  const [recognizedUser, setRecognizedUser] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecognize = async () => {
    try {
      setLoading(true);

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        alert("No face detected");
        setLoading(false);
        return;
      }

      const liveDescriptor = detection.descriptor;

      const res = await fetch(
        "http://localhost:8000/api/auth/users"
      );

      const users = await res.json();

      let bestMatch = null;
      let smallestDistance = 1;

      for (const user of users) {
        const distance = faceapi.euclideanDistance(
          liveDescriptor,
          user.descriptor
        );

        console.log(user.name, distance);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          bestMatch = user;
        }
      }

      if (bestMatch && smallestDistance < 0.6) {
        setRecognizedUser(bestMatch.name);
      } else {
        setRecognizedUser("Unknown User");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Face Recognition Login</h1>

      <Webcam videoRef={videoRef} />

      <br />

      <button onClick={handleRecognize}>
        Recognize Face
      </button>

      <br />
      <br />

      {loading && <p>Recognizing...</p>}

      <h2>
        Recognized User: {recognizedUser}
      </h2>
    </div>
  );
}