import { useEffect, useState } from "react";
import "../Style.css";
import Navbar from "../components/DashboardNavbar";
import { Eye, Pencil, Search, X, Mail, CalendarDays, Trees, } from "lucide-react";
import DataTable from "react-data-table-component";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // FETCH USERS FROM MONGODB
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // SEARCH FILTER
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  // SAVE EDITED USER
  const handleSave = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === editingUser._id ? editingUser : user
      )
    );
    setEditingUser(null);
  };

  // DATATABLE COLUMNS
  const columns = [
    {
      name: "User ID",
      selector: (row) => row.userId,
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },

    {
      name: "Date Joined",
      selector: (row) => row.joinedDate,
      sortable: true,
      center: true,
    },

    {
      name: "Total Trees Donated",
      selector: (row) => row.treesDonated,
      sortable: true,
      center: true,
    },

    {
      name: "Status",
      center: true,
      cell: (row) => (
        <span
          className={
            row.status === "Active"
              ? "active-status"
              : "inactive-status"
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
            onClick={() => setSelectedUser(row)}
          >
            <Eye size={13} />
          </button>
          {/* EDIT */}
          <button
            className="action-circle"
            onClick={() => setEditingUser(row)}
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
          <h1 className="users-heading">
            Users
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
        {/* DATATABLE */}
        <div className="users-card">
          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            highlightOnHover
            responsive
            striped
            noDataComponent="No users found"
          />
        </div>
      </div>
      {/* VIEW MODAL */}
      {selectedUser && (
        <div className="modal-overlay">
          <div className="profile-modal">
            <button
              className="close-modal"
              onClick={() => setSelectedUser(null)}
            >
              <X size={18} />
            </button>
            {/* TOP */}
            <div className="modal-top">
              <div className="modal-user-details">
                <h1 className="modal-name">
                  {selectedUser.name}
                </h1>
                <p className="user-id">
                  User ID: {selectedUser.userId}
                </p>
                <div className="tree-count">
                  <Trees size={15} />
                  {selectedUser.treesDonated} Trees Donated
                </div>
              </div>
            </div>
            {/* INFO */}
            <div className="modal-info">
              <div className="info-row">
                <Mail size={15} color="#f5a100" />
                <p>{selectedUser.email}</p>
              </div>
              <div className="info-row">
                <CalendarDays size={15} color="#f5a100" />
                <p>{selectedUser.joinedDate}</p>
              </div>
              {/* STATUS + EDIT */}
              <div className="modal-bottom">
                <div className="status-wrapper">
                  <div
                    className={
                      selectedUser.status === "Active"
                        ? "status-dot active-dot"
                        : "status-dot inactive-dot"
                    }
                  ></div>
                  <span
                    className={
                      selectedUser.status === "Active"
                        ? "active-status"
                        : "inactive-status"
                    }
                  >
                    {selectedUser.status}
                  </span>
                </div>
                <button
                  className="edit-link"
                  onClick={() => {
                    setEditingUser(selectedUser);
                    setSelectedUser(null);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* EDIT MODAL */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <button
              className="close-modal"
              onClick={() => setEditingUser(null)}
            >
              <X size={18} />
            </button>
            <h1 className="edit-title">
              Edit User Status
            </h1>
            <div className="edit-form">
              {/* NAME */}
              <div className="input-group">
                <label className="input-label">
                  Name
                </label>
                <input
                  type="text"
                  className="edit-input"
                  value={editingUser.name}
                  disabled
                />
              </div>
              {/* EMAIL */}
              <div className="input-group">
                <label className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  className="edit-input"
                  value={editingUser.email}
                  disabled
                />
              </div>
              {/* TREES */}
              <div className="input-group">
                <label className="input-label">
                  Total Trees Donated
                </label>
                <input
                  type="number"
                  className="edit-input"
                  value={editingUser.treesDonated}
                  disabled
                />
              </div>
              {/* STATUS */}
              <div className="input-group">
                <label className="input-label">
                  Status
                </label>
                <select
                  className="edit-input status-select"
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Active</option>
                  <option>Inactive</option>
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