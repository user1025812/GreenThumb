import "../Dashboard.css";
import Navbar from "../components/DashboardNavbar";
import { Trees, Users, Sprout, PhilippinePeso, } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
      PieChart, Pie, Cell, Legend, } from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

const contributionData = [
  { month: "Jan", narra: 40, molave: 22, aratilis: 33 },
  { month: "Feb", narra: 37, molave: 29, aratilis: 41 },
  { month: "Mar", narra: 38, molave: 32, aratilis: 48 },
  { month: "Apr", narra: 46, molave: 34, aratilis: 52 },
  { month: "May", narra: 58, molave: 36, aratilis: 48 },
  { month: "Jun", narra: 57, molave: 39, aratilis: 50 },
  { month: "Jul", narra: 44, molave: 42, aratilis: 59 },
];

const pieData = [
  { name: "Narra", value: 50 },
  { name: "Molave", value: 15 },
  { name: "Aratilis", value: 35 },
];

const COLORS = ["#7384ff", "#f26da9", "#9d5ce5"];
const donations = [
  {
    donor: "Nathaniel Dela Cruz",
    tree: "Narra",
    amount: "₱ 500.00",
    date: "Apr 01, 2026",
  },

  {
    donor: "Althea Marie Santos",
    tree: "Aratilis",
    amount: "₱250.00",
    date: "Mar 29, 2026",
  },

  {
    donor: "Gabriel Mendoza",
    tree: "Molave",
    amount: "₱400.00",
    date: "Mar 27, 2026",
  },

  {
    donor: "Samantha Reyes",
    tree: "Narra",
    amount: "₱ 500.00",
    date: "Mar 24, 2026",
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTrees: 0,
    activeUsers: 0,
    pendingPlantings: 0,
    totalDonations: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/stats"
      );
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-root users-page">
      {/* NAVBAR */}
      <Navbar />

      <div className="users-wrapper">

        {/* HEADER */}
        <div className="users-header">
          <div>
            <h1 className="users-heading">
              Dashboard
            </h1>
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="dashboard-cards">
          {/* TOTAL TREES PLANTED */}
          <div className="dashboard-card">
            <div>
              <h3>Total Trees Planted</h3>
              <h1>
                {stats.totalTrees}
              </h1>
            </div>
            <div className="dashboard-icon">
              <Trees size={24} />
            </div>
          </div>
          {/* ACTIVE USERS */}
          <div className="dashboard-card">
            <div>
              <h3>Active Users</h3>
              <h1>
                {stats.activeUsers}
              </h1>
            </div>
            <div className="dashboard-icon">
              <Users size={24} />
            </div>
          </div>
          {/* PENDING PLANTINGS */}
          <div className="dashboard-card">
            <div>
              <h3>Pending Plantings</h3>
              <h1>
                {stats.pendingPlantings}
              </h1>
            </div>
            <div className="dashboard-icon">
              <Sprout size={24} />
            </div>
          </div>
          {/* TOTAL DONATIONS */}
          <div className="dashboard-card donation-highlight">
            <div>
              <h3>Total Donations</h3>
              <h1>
                ₱ {stats.totalDonations}
              </h1>
            </div>
            <div className="dashboard-icon">
              <PhilippinePeso size={24} />
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="dashboard-charts">
          {/* LINE CHART */}
          <div className="chart-box">
            <h2>Contribution Insights</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={contributionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="narra"
                  stroke="#7384ff"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="molave"
                  stroke="#d58cff"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="monotone"
                  dataKey="aratilis"
                  stroke="#f39aba"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* PIE CHART */}
          <div className="chart-box">
            <h2>Tree Popularity</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  dataKey="value"
                >

                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* LATEST DONATION TABLE */}
        <div className="donation-table-box">
          <h2>Latest Donations</h2>
          <table>
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Tree Type</th>
                <th>Amount</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((item, index) => (
                <tr key={index}>
                  <td>{item.donor}</td>
                  <td>{item.tree}</td>
                  <td>{item.amount}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}