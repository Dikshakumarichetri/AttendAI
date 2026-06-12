"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="center_content">
      <h1 className="home_h1">AI Face Recognition Attendance System</h1>

      <p className="para_home">
        Register users, recognize faces, and track attendance.
      </p>

      <div className="btn_home">
        <button className="btn" onClick={() => router.push("/register")}>
          Register User
        </button>

        <button className="btn" onClick={() => router.push("/login")}>
          Face Login
        </button>

        <button className="btn" onClick={() => router.push("/dashboard")}>
          Admin Dashboard
        </button>
      </div>
    </div>
  );
}