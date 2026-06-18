"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";
export default function Dashboard() {
  const [attendance, setAttendance] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const res = await fetch("https://attendai-j152.onrender.com/api/attendance");
    const data = await res.json();
    setAttendance(data);
  };

  // FILTER LOGIC
  const filteredAttendance = attendance.filter((item) => {
    const matchUser = item.userId?.name
      ?.toLowerCase()
      .includes(searchUser.toLowerCase());

    const matchDate = selectedDate
      ? item.date === selectedDate
      : true;

    const matchStatus = statusFilter
      ? item.status === statusFilter
      : true;

    return matchUser && matchDate && matchStatus;
  });
  const groupedByDate = attendance.reduce((acc, item) => {
    acc[item.date] = (acc[item.date] || 0) + 1;
    return acc;
  }, {});
  
  const chartData = Object.entries(groupedByDate).map(
    ([date, count]) => ({
      date,
      count,
    })
  );
  return (
    <div className="center_content">
      <h1>Admin Dashboard</h1>

      {/* SUMMARY */}
      <div className="summary_grid">
  <div className="card">
    <h3>Total Records</h3>
    <p>{attendance.length}</p>
  </div>
</div>
       

      {/* FILTERS */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search user..."
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Present">Present</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="table_container">

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredAttendance.map((record) => (
            <tr key={record._id}>
              <td>{record.userId?.name}</td>
              <td>{record.date}</td>
              <td>{record.time}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="chart_container">
  <h2 className="chart_header">Attendance Trend</h2>
  <div className="chart_area">

  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#8884d8"
        strokeWidth={2}
      />
    </LineChart>
  </ResponsiveContainer>
  </div>
</div>
    </div>
  );
}