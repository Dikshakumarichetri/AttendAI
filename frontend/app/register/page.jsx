"use client"
import { useRef, useState } from "react"
import Webcam from "@/components/Webcam";
import *  as faceapi from 'face-api.js';

export default function Register(){
    const videoRef = useRef(null);
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleRegister = async () => {
    try {
      if (!name) {
        setSuccessMessage("Please enter a name");
        return;
      }
  
      const video = videoRef.current;
  
      if (!video) {
        setSuccessMessage("Camera not ready");
        return;
      }
  
      const detection = await faceapi
        .detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceDescriptor();
  
      if (!detection) {
        setSuccessMessage("No face detected");
        return;
      }
  
      // Check existing users first
      const usersRes = await fetch(
        "http://localhost:8000/api/auth/users"
      );
  
      const users = await usersRes.json();
  
      let existingUser = null;
  
      for (const user of users) {
        const distance = faceapi.euclideanDistance(
          detection.descriptor,
          user.descriptor
        );
  
        console.log(user.name, distance);
  
        if (distance < 0.6) {
          existingUser = user;
          break;
        }
      }
  
      // Face already exists
      if (existingUser) {
        setSuccessMessage(
          `Face already registered as ${existingUser.name}`
        );
        return;
      }
  
      // Save new user
      const res = await fetch(
        "http://localhost:8000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            descriptor: Array.from(detection.descriptor),
          }),
        }
      );
  
      const data = await res.json();
  
      if (res.status === 201) {
        setSuccessMessage("Registration successful");
        setName("");
      } else {
        setSuccessMessage(
          data.message || "Registration failed"
        );
      }
  
    } catch (err) {
      console.log(err);
      setSuccessMessage("Something went wrong");
    }
  };
    return(
      
        <div className="center_content">
          {successMessage && (
  <div className="modal_overlay">
    <div className="modal_box">
      <p>{successMessage}</p>

      <a href="/login" className="link_style">
        Go to Login →
      </a>

      <button className="modal_button" onClick={() => setSuccessMessage("")}>
        Close
      </button>
    </div>
  </div>
)}
        <h1>Register User</h1>
  
      
        <br />
  
        <Webcam videoRef={videoRef} />
  
        <br />
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          className="input_box"
          onChange={(e) => setName(e.target.value)}
        />
  
        <br />
        <div className="btn_home" >
        <button onClick={handleRegister}>
          Register Face
          </button>
        </div>
        <p>Already Registered ?  <a className="link_style" href="/login">  Login here</a> </p>
      </div>
    )
}