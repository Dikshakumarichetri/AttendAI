export default function Home() {
  return (
    <div  className="center_content">
      <h1 className="home_h1">AI Face Recognition Attendance System</h1>

      <p className="para_home">
        Register users, recognize faces, and track attendance.
      </p>

      <div className="btn_home">
      <a href="/register" className="btn">
  Register User
</a>

        <a href="/login"  className="btn">
        Face Login
        </a>

        <a href="/dashboard"  className="btn">
         Admin Dashboard
        </a>
      </div>
    </div>
  );
}