import "../Dashboard.css";
import Navbar from "../components/DashboardNavbar";
import { Trees, Users, Sprout, PhilippinePeso } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
    PieChart, Pie, Cell, Legend, CartesianGrid } from "recharts";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";

const COLORS = [
  "#7384ff",
  "#f26da9",
  "#9d5ce5",
  "#4CAF50",
  "#FF9800",
  "#00BCD4",
  "#8BC34A",
  "#E91E63",
];

export default function Dashboard() {

  const [stats, setStats] = useState({
    totalTrees: 0,
    activeUsers: 0,
    pendingPlantings: 0,
    totalDonations: 0,
  });

  const [dashboardData, setDashboardData] = useState({
    latestDonations: [],
    treePopularity: [],
    contributionData: [],
  });

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard/stats");
      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard/dashboard-data");
      setDashboardData({
        latestDonations: response.data.latestDonations || [],
        treePopularity: response.data.treePopularity || [],
        contributionData: response.data.contributionData || [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchDashboardData();
  }, []);

  const donationColumns = [
    {
      name: "Donor Name",
      selector: (row) => row.donor || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Tree Type",
      selector: (row) => row.tree || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Date",
      selector: (row) => row.datePaid || "N/A",
      sortable: true,
      center: true,
    },
  ];

  return (
    <div className="dashboard-root users-page">
      <Navbar />
      <div className="users-wrapper">
        <div className="users-header">
          <h1 className="users-heading">Dashboard</h1>
        </div>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <div>
              <h3>Total Trees Planted</h3>
              <h1>{stats.totalTrees}</h1>
            </div>
            <div className="dashboard-icon">
              <Trees size={24} />
            </div>
          </div>
          <div className="dashboard-card">
            <div>
              <h3>Active Users</h3>
              <h1>{stats.activeUsers}</h1>
            </div>
            <div className="dashboard-icon">
              <Users size={24} />
            </div>
          </div>
          <div className="dashboard-card">
            <div>
              <h3>Pending Plantings</h3>
              <h1>{stats.pendingPlantings}</h1>
            </div>
            <div className="dashboard-icon">
              <Sprout size={24} />
            </div>
          </div>
          <div className="dashboard-card donation-highlight">
            <div>
              <h3>Total Donations</h3>
              <h1>
                {stats.totalDonations === "N/A"
                  ? "N/A"
                  : `₱ ${stats.totalDonations}`}
              </h1>
            </div>
            <div className="dashboard-icon">
              <PhilippinePeso size={24} />
            </div>
          </div>
        </div>
        <div className="dashboard-charts">
          <div className="chart-box">
            <h2>Contribution Insights</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.contributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {dashboardData.treePopularity.map((treeItem, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={String(treeItem._id).trim()}
                    name={String(treeItem._id).trim()}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-box">
            <h2>Tree Popularity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.treePopularity.map((item) => ({
                    name: String(item._id).trim(),
                    value: item.value,
                  }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label
                >
                  {dashboardData.treePopularity.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="donation-table-box">
          <h2>Latest Donations</h2>
          <DataTable
            columns={donationColumns}
            data={dashboardData.latestDonations}
            pagination
            highlightOnHover
            responsive
            striped
            noDataComponent="No donations yet"
          />
        </div>
      </div>
    </div>
  );
}