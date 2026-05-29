"use client"
import { useRef, useState } from "react"
import Webcam from "@/components/Webcam";
import *  as faceapi from 'face-api.js';

export default function Register(){
    const videoRef = useRef(null);
  const [name, setName] = useState("");

  const handleRegister = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    const detection = await faceapi
      .detectSingleFace(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      alert("No face detected");
      return;
    }

    const descriptor = Array.from(detection.descriptor);

    console.log("Name:", name);
    console.log("Descriptor:", descriptor);

    // Send to backend here
    const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          descriptor,
        }),
      });
  
      const data = await res.json();
      console.log("Saved user:", data);
  };
  
    return(
        <div>
        <h1>Register User</h1>
  
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
  
        <br />
        <br />
  
        <Webcam videoRef={videoRef} />
  
        <br />
  
        <button onClick={handleRegister}>
          Register Face
        </button>
      </div>
    )
}