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
                <th>Donation ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Tree Species</th>
                <th>Quantity</th>
                <th>Date of Request</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {filteredTrees.map((tree) => (
                <tr key={tree._id}>
                  <td>{tree.donationId}</td>
                  <td>{tree.name}</td>
                  <td>{tree.email}</td>
                  <td>{tree.species}</td>
                  <td>{tree.quantity}</td>
                  <td>{tree.date}</td>
                  <td>
                    <span
                      className={
                        tree.status === "Pending"
                          ? "pending-status"
                          : tree.status === "Paid"
                          ? "paid-status"
                          : "planted-status"
                      }
                    >
                      {tree.status}
                    </span>
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
              Tree Donation Details
            </h1>
            <div className="modal-info">
              <div className="info-row">
                <p>
                  <strong>Donation ID:</strong>{" "}
                  {selectedTree.donationId}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedTree.name}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Email:</strong>{" "}
                  {selectedTree.email}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Tree Species:</strong>{" "}
                  {selectedTree.species}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Quantity:</strong>{" "}
                  {selectedTree.quantity}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Date of Request:</strong>{" "}
                  {selectedTree.date}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Status:</strong>{" "}
                </p>

                <span
                  className={
                    selectedTree.status === "Pending"
                      ? "pending-status"
                      : selectedTree.status === "Paid"
                      ? "paid-status"
                      : "planted-status"
                  }
                >
                  {selectedTree.status}
                </span>
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
              Edit Tree Status
            </h1>

            <div className="edit-form">
              <div className="input-group">
                <label className="input-label">
                  Tree Species
                </label>

                <input
                  type="text"
                  className="edit-input"
                  value={editingTree.species}
                  disabled
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  Quantity
                </label>

                <input
                  type="number"
                  min="1"
                  className="edit-input"
                  value={editingTree.quantity}
                  disabled
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  Status
                </label>
                <select
                  className="edit-input status-select"
                  value={editingTree.status}
                  onChange={(e) =>
                    setEditingTree({
                      ...editingTree,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Planted</option>
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