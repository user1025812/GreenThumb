import { useEffect, useState } from "react";
import Navbar from "../components/DashboardNavbar";
import { Search, Eye, Pencil } from "lucide-react";

export default function Progress() {
  const [progressData, setProgressData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingProgress, setEditingProgress] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // FETCH PROGRESS
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

  // SEARCH
  const filteredProgress = progressData.filter((item) =>
    item.species.toLowerCase().includes(search.toLowerCase())
  );

  // SAVE EDITED STAGE
  const handleSave = () => {
    fetch(`http://localhost:5000/api/progress/${editingProgress._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingProgress),
    })
      .then((res) => res.json())
      .then((updatedProgress) => {

        const updatedData = progressData.map((item) =>
          item._id === updatedProgress._id
            ? updatedProgress
            : item
        );
        setProgressData(updatedData);
        setEditingProgress(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="users-wrapper">
        <div className="users-header">
          <h1 className="users-heading">
            Progress
          </h1>
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
                    <button
                      className="paid-status view-photo-btn"
                      onClick={() => setSelectedPhoto(item.photo)}
                    >
                      View Photo
                    </button>
                  </td>
                  <td>
                    <div className="table-actions">

                      {/* VIEW */}
                      <button
                        className="action-circle"
                        onClick={() => {
                          setSelectedProgress(item);
                          setShowViewModal(true);
                        }}
                      >
                        <Eye size={14} />
                      </button>

                      {/* EDIT */}
                      <button
                        className="action-circle"
                        onClick={() => setEditingProgress(item)}
                      >
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

      {/* VIEW MODAL */}
      {showViewModal && selectedProgress && (
        <div className="modal-overlay">
          <div className="profile-modal">

            <button
              className="close-modal"
              onClick={() => setShowViewModal(false)}
            >
              ✕
            </button>

            <h1 className="edit-title">
              Progress Details
            </h1>

            <div className="modal-info">

              <div className="info-row">
                <p>
                  <strong>Tree ID:</strong>{" "}
                  {selectedProgress.treeId}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Species:</strong>{" "}
                  {selectedProgress.species}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Assigned Farmer:</strong>{" "}
                  {selectedProgress.farmer}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Last Update:</strong>{" "}
                  {selectedProgress.lastUpdate}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Current Location:</strong>{" "}
                  {selectedProgress.location}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Stage:</strong>{" "}
                  {selectedProgress.stage}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Next Update Due:</strong>{" "}
                  {selectedProgress.nextUpdate}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Photo Upload:</strong>{" "}
                </p>

                <button
                  className="paid-status view-photo-btn"
                  onClick={() =>
                    setSelectedPhoto(selectedProgress?.photo)
                  }
                >
                  View Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO */}
      {selectedPhoto && (
        <div className="modal-overlay">
          <div className="photo-modal">
            <button
              className="close-modal"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
            <img
              src={selectedPhoto}
              alt="Tree Progress"
              className="photo-preview"
            />
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingProgress && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <button
              className="close-modal"
              onClick={() => setEditingProgress(null)}
            >
              ✕
            </button>
            <h1 className="edit-title">
              Edit Progress Status
            </h1>
            <div className="edit-form">

              {/* TREE ID */}
              <div className="input-group">
                <label className="input-label">
                  Tree ID
                </label>
                <input
                  type="text"
                  className="edit-input"
                  value={editingProgress.treeId}
                  disabled
                />
              </div>

              {/* SPECIES */}
              <div className="input-group">
                <label className="input-label">
                  Species
                </label>
                <input
                  type="text"
                  className="edit-input"
                  value={editingProgress.species}
                  disabled
                />
              </div>

              {/* ASSIGNED FARMER */}
              <div className="input-group">
                <label className="input-label">
                  Assigned Farmer
                </label>
                <input
                  type="text"
                  className="edit-input"
                  value={editingProgress.farmer}
                  disabled
                />
              </div>

              {/* CURRENT LOCATION */}
              <div className="input-group">
                <label className="input-label">
                  Current Location
                </label>
                <input
                  type="text"
                  className="edit-input"
                  value={editingProgress.location}
                  disabled
                />
              </div>

              {/* STAGE */}
              <div className="input-group">
                <label className="input-label">
                  Stage
                </label>
                <select
                  className="edit-input status-select"
                  value={editingProgress.stage}
                  onChange={(e) =>
                    setEditingProgress({
                      ...editingProgress,
                      stage: e.target.value,
                    })
                  }
                >
                  <option>Seedling</option>
                  <option>Growing</option>
                  <option>Mature</option>
                </select>
              </div>

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}