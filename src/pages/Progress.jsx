import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Search, Eye, Pencil } from "lucide-react";

export default function Progress() {
  const [progressData, setProgressData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/progress")
      .then((response) => response.json())
      .then((data) => {
        console.log("PROGRESS DATA:", data);

        setProgressData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredProgress = progressData.filter((item) =>
    item.species.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="users-wrapper">
        <div className="users-header">
          <h1 className="users-heading">Progress</h1>

          <div className="search-box">
            <Search size={14} color="#999" />

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="users-card">
          <table className="users-table progress-table">
            <thead>
              <tr>
                <th>Tree ID</th>
                <th>Species</th>
                <th>Assigned Farmer</th>
                <th>Last Update</th>
                <th>Current Location</th>
                <th>Stage</th>
                <th>Next Update Due</th>
                <th>Photo Upload</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProgress.map((item) => (
                <tr key={item._id}>
                  <td>{item.treeId}</td>
                  <td>{item.species}</td>
                  <td>{item.farmer}</td>
                  <td>{item.lastUpdate}</td>
                  <td>{item.location}</td>
                  <td>{item.stage}</td>
                  <td>{item.nextUpdate}</td>

                  <td>
                    <span className="paid-status">
                      {item.photo}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button className="action-circle">
                        <Eye size={14} />
                      </button>

                      <button className="action-circle">
                        <Pencil size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}