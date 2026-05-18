import { useEffect, useState } from "react";
import Navbar from "../components/DashboardNavbar";
import {Search, Eye, Pencil, X,} from "lucide-react";

export default function Trees() {

  const [trees, setTrees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTree, setSelectedTree] = useState(null);
  const [editingTree, setEditingTree] = useState(null);

  //FETCH TREES
  useEffect(() => {

    fetch("http://localhost:5000/api/trees")
      .then((res) => res.json())
      .then((data) => {
        setTrees(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  //SEARCH
  const filteredTrees = trees.filter(
    (tree) =>
      tree.name.toLowerCase().includes(search.toLowerCase()) ||
      tree.email.toLowerCase().includes(search.toLowerCase())
  );

  //SAVE EDIT
  const handleSave = () => {
    fetch(`http://localhost:5000/api/trees/${editingTree._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingTree),
    })
      .then((res) => res.json())
      .then((updatedTree) => {
        const updatedTrees = trees.map((tree) =>
          tree._id === updatedTree._id
            ? updatedTree
            : tree
        );
        setTrees(updatedTrees);
        setEditingTree(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="users-wrapper">
        {/*HEADER*/}
        <div className="users-header">
          <h1 className="users-heading">
            Trees
          </h1>
          <div className="search-box">
            <Search size={16} color="#999" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/*TABLE*/}
        <div className="users-card">
          <table className="users-table trees-table">
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
              {filteredTrees.map((tree) => (
                <tr key={tree._id}>
                  <td>{tree.treeId}</td>
                  <td>{tree.species}</td>
                  <td>{tree.assignedFarmer}</td>
                  <td>{tree.lastUpdate}</td>
                  <td>{tree.currentLocation}</td>
                  <td>
                    <span
                      className={
                        tree.stage === "Pending"
                          ? "pending-status"
                          : tree.stage === "Paid"
                          ? "paid-status"
                          : "planted-status"
                      }
                    >
                      {tree.stage}
                    </span>
                  </td>
                  <td>{tree.nextUpdateDue}</td>
                  <td>
                    {tree.photoUpload ? (
                      <img
                        src={tree.photoUpload}
                        alt="Tree"
                        style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "6px" }}
                      />
                    ) : (
                      "No photo"
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="action-circle"
                        onClick={() => setSelectedTree(tree)}
                      >
                        <Eye size={13} />
                      </button>

                      <button
                        className="action-circle"
                        onClick={() => setEditingTree(tree)}
                      >
                        <Pencil size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*VIEW MODAL*/}
      {selectedTree && (
        <div className="modal-overlay">
          <div className="profile-modal">
            <button
              className="close-modal"
              onClick={() => setSelectedTree(null)}
            >
              <X size={18} />
            </button>
            <h1 className="edit-title">
              Tree Details
            </h1>
            <div className="modal-info">
              <div className="info-row">
                <p><strong>Tree ID:</strong> {selectedTree.treeId}</p>
              </div>
              <div className="info-row">
                <p><strong>Species:</strong> {selectedTree.species}</p>
              </div>
              <div className="info-row">
                <p><strong>Assigned Farmer:</strong> {selectedTree.assignedFarmer}</p>
              </div>
              <div className="info-row">
                <p><strong>Last Update:</strong> {selectedTree.lastUpdate}</p>
              </div>
              <div className="info-row">
                <p><strong>Current Location:</strong> {selectedTree.currentLocation}</p>
              </div>
              <div className="info-row">
                <p><strong>Stage:</strong> {selectedTree.stage}</p>
              </div>
              <div className="info-row">
                <p><strong>Next Update Due:</strong> {selectedTree.nextUpdateDue}</p>
              </div>
              <div className="info-row">
                {selectedTree.photoUpload ? (
                  <img
                    src={selectedTree.photoUpload}
                    alt="Tree"
                    style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
                  />
                ) : (
                  <p><strong>Photo:</strong> No photo uploaded</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/*EDIT MODAL*/}
      {editingTree && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <button
              className="close-modal"
              onClick={() => setEditingTree(null)}
            >
              <X size={18} />
            </button>

            <h1 className="edit-title">
              Edit Tree
            </h1>

            <div className="edit-form">
              <div className="input-group">
                <label className="input-label">Species</label>
                <input
                  type="text"
                  className="edit-input"
                  value={editingTree.species}
                  onChange={(e) =>
                    setEditingTree({ ...editingTree, species: e.target.value })
                  }
                />
              </div>

              <div className="input-group">
                <label className="input-label">Assigned Farmer</label>
                <input
                  type="text"
                  className="edit-input"
                  value={editingTree.assignedFarmer}
                  onChange={(e) =>
                    setEditingTree({ ...editingTree, assignedFarmer: e.target.value })
                  }
                />
              </div>

              <div className="input-group">
                <label className="input-label">Current Location</label>
                <input
                  type="text"
                  className="edit-input"
                  value={editingTree.currentLocation}
                  onChange={(e) =>
                    setEditingTree({ ...editingTree, currentLocation: e.target.value })
                  }
                />
              </div>

              <div className="input-group">
                <label className="input-label">Stage</label>
                <select
                  className="edit-input status-select"
                  value={editingTree.stage}
                  onChange={(e) =>
                    setEditingTree({ ...editingTree, stage: e.target.value })
                  }
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Planted</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Next Update Due</label>
                <input
                  type="date"
                  className="edit-input"
                  value={editingTree.nextUpdateDue}
                  onChange={(e) =>
                    setEditingTree({ ...editingTree, nextUpdateDue: e.target.value })
                  }
                />
              </div>

              <div className="input-group">
                <label className="input-label">Photo Upload</label>
                <input
                  type="text"
                  className="edit-input"
                  placeholder="Image URL"
                  value={editingTree.photoUpload}
                  onChange={(e) =>
                    setEditingTree({ ...editingTree, photoUpload: e.target.value })
                  }
                />
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