import DashboardNavbar from "../components/DashboardNavbar";
import '../Dashboard.css';
export default function Dashboard() {
  return (
    <>
      <DashboardNavbar />

      <div className="page-container">
        <h1 className="page-title">Dashboard</h1>
      </div>
    </>
  );
}