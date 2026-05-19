import { useEffect, useState } from "react";
import "../Style.css";
import Navbar from "../components/DashboardNavbar";
import { Search, Eye, Pencil, X } from "lucide-react";
import DataTable from "react-data-table-component";
import "../Dashboard.css";


export default function Trees() {
  const [trees, setTrees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTree, setSelectedTree] = useState(null);
  const [editingTree, setEditingTree] = useState(null);

  // FETCH TREES
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

  // SEARCH
  const filteredTrees = trees.filter(
    (tree) =>
      tree.name?.toLowerCase().includes(search.toLowerCase()) ||
      tree.email?.toLowerCase().includes(search.toLowerCase())
  );
  // SAVE EDIT
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
          tree._id === updatedTree._id ? updatedTree : tree
        );
        setTrees(updatedTrees);
        setEditingTree(null);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  // DATATABLE COLUMNS
  const columns = [
    {
      name: "Donation ID",
      selector: (row) => row.donationId,
      sortable: true,
      center: true,
    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },

    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },

    {
      name: "Tree Species",
      selector: (row) => row.species,
      sortable: true,
      center: true,
    },

    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      center: true,
    },

    {
      name: "Date of Request",
      selector: (row) => row.date,
      sortable: true,
      center: true,
    },

    {
      name: "Status",
      center: true,
      cell: (row) => (
        <span
          className={
            row.status === "Pending"
              ? "pending-status"
              : row.status === "Paid"
              ? "paid-status"
              : "planted-status"
          }
        >
          {row.status}
        </span>
      ),
    },

    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="table-actions">
          {/* VIEW */}
          <button
            className="action-circle"
            onClick={() => setSelectedTree(row)}
          >
            <Eye size={13} />
          </button>
          {/* EDIT */}
          <button
            className="action-circle"
            onClick={() => setEditingTree(row)}
          >
            <Pencil size={13} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <Navbar />
      <div className="users-wrapper">
        {/* HEADER */}
        <div className="users-header">
          <h1 className="users-heading">Trees</h1>
          <div className="search-box">
            <Search size={16} color="#999" />
            <input
              type="text"
              placeholder="Search by name, email, or site..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* DATATABLE */}
        <div className="users-card">
          <DataTable
            columns={columns}
            data={filteredTrees}
            pagination
            highlightOnHover
            responsive
            striped
            noDataComponent="No tree donations found"
          />
        </div>
      </div>
      {/* VIEW MODAL */}
      {selectedTree && (
        <div className="modal-overlay">
          <div className="profile-modal">
            <button
              className="close-modal"
              onClick={() => setSelectedTree(null)}
            >
              <X size={18} />
            </button>
            <h1 className="edit-title">Tree Donation Details</h1>
            <div className="modal-info">
              <div className="info-row">
                <p>
                  <strong>Donation ID:</strong> {selectedTree.donationId}
                </p>
              </div>
              <div className="info-row">
                <p>
                  <strong>Name:</strong> {selectedTree.name}
                </p>
              </div>
              <div className="info-row">
                <p>
                  <strong>Email:</strong> {selectedTree.email}
                </p>
              </div>
              <div className="info-row">
                <p>
                  <strong>Tree Species:</strong> {selectedTree.species}
                </p>
              </div>
              <div className="info-row">
                <p>
                  <strong>Quantity:</strong> {selectedTree.quantity}
                </p>
              </div>
              <div className="info-row">
                <p>
                  <strong>Target Region:</strong> {selectedTree.location}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Specific Site:</strong> {selectedTree.specificSite}
                </p>
              </div>

              <div className="info-row">
                <p>
                  <strong>Date of Request:</strong> {selectedTree.date}
                </p>
              </div>
              <div className="info-row">
                <p>
                  <strong>Status:</strong>
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
      {/* EDIT MODAL */}
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
              {/* TREE SPECIES */}
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
              {/* QUANTITY */}
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
              {/* STATUS */}
              <div className="input-group">
                <label className="input-label">Target Site</label>
                <input
                  type="text"
                  className="edit-input"
                  value={`${editingTree.location} — ${editingTree.specificSite}`}
                  disabled
                />
              </div>

              <div className="input-group">
                <label className="input-label">Status</label>
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