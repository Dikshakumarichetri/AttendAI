"use client";

import { useRef, useState } from "react";
import Webcam from "@/components/Webcam";
import * as faceapi from "face-api.js";

export default function Login() {
  const videoRef = useRef(null);

  const [recognizedUser, setRecognizedUser] = useState("");
  const [attendanceMessage, setAttendanceMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecognize = async () => {
    try {
      setLoading(true);
      setAttendanceMessage("");

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
        "https://attendai-j152.onrender.com/api/auth/users"
      );

      const users = await res.json();

      let bestMatch = null;
      let smallestDistance = 1;

      for (const user of users) {
        const distance = faceapi.euclideanDistance(
          liveDescriptor,
          user.descriptor
        );

        if (distance < smallestDistance) {
          smallestDistance = distance;
          bestMatch = user;
        }
      }

      if (bestMatch && smallestDistance < 0.6) {
        setRecognizedUser(bestMatch.name);

        const attendanceRes = await fetch(
          "https://attendai-j152.onrender.com/api/attendance/mark",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: bestMatch._id,
            }),
          }
        );

        const attendanceData = await attendanceRes.json();

        setAttendanceMessage(attendanceData.message);
      } else {
        setRecognizedUser("Unknown User");
        setAttendanceMessage("");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="center_content">
      <div className="login_heading">
      <h1>Face Recognition Login</h1>
   <a className="link_style" href="/dashboard">  Go To dashboard </a> 
   </div>
      <Webcam videoRef={videoRef} />

      <br />
      <div className="btn_home">
  <button onClick={handleRecognize}>
    Recognize Face
  </button>
</div>

      <br />
      {loading && <p className="loading_text">Recognizing...</p>}

<div className="result_box">
<h3>
  Recognized User: {recognizedUser || "Waiting for recognition..."}
</h3>
  <h4>{attendanceMessage}</h4>
</div>
      
    </div>
  );
}