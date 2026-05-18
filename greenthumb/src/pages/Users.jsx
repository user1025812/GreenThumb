import { useEffect, useState } from "react";
import Navbar from "../components/DashboardNavbar";
import {Eye, Pencil, Search, X, Mail, CalendarDays, Trees,} from "lucide-react";
import DataTable from "react-data-table-component";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  //FETCH USERS FROM MONGODB
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

  //SEARCH
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  //SAVE EDITED USER
  const handleSave = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === editingUser._id ? editingUser : user
      )
    );
    setEditingUser(null);
  };
  
  const columns = [
  {
    name: "User ID",
    selector: (row) => row.userId,
    sortable: true,
  },

  {
    name: "Email",
    selector: (row) => row.email,
  },

  {
    name: "Name",
    selector: (row) => row.name,
  },

  {
    name: "Date Joined",
    selector: (row) => row.joinedDate,
  },

  {
    name: "Total Trees Donated",
    selector: (row) => row.treesDonated,
    sortable: true,
  },

  {
    name: "Status",
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
    cell: (row) => (
      <div className="table-actions">

        <button
          className="action-circle"
          onClick={() => setSelectedUser(row)}
        >
          <Eye size={13} />
        </button>

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
        {/*HEADER*/}
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
        {/*TABLE*/}
        <div className="users-card">
          <table className="users-table users-table-columns">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Date Joined</th>
                <th>Total Trees Donated</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.userId}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.joinedDate}</td>
                  <td>{user.treesDonated}</td>
                  <td>
                    <span
                      className={
                        user.status === "Active"
                          ? "active-status"
                          : "inactive-status"
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      {/*VIEW*/}
                      <button
                        className="action-circle"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye size={13} />
                      </button>
                      {/*EDIT*/}
                      <button
                        className="action-circle"
                        onClick={() => setEditingUser(user)}
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
      {selectedUser && (
        <div className="modal-overlay">
          <div className="profile-modal">
            <button
              className="close-modal"
              onClick={() => setSelectedUser(null)}
            >
              <X size={18} />
            </button>
            {/*TOP*/}
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
            {/*INFO*/}
            <div className="modal-info">
              <div className="info-row">
                <Mail size={15} color="#f5a100" />
                <p>{selectedUser.email}</p>
              </div>
              <div className="info-row">
                <CalendarDays size={15} color="#f5a100" />
                <p>{selectedUser.joinedDate}</p>
              </div>

              {/*STATUS + EDIT*/}
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

      {/*EDIT MODAL*/}
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

              {/*NAME*/}
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

              {/*EMAIL*/}
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

              {/*TREES*/}
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

              {/*STATUS*/}
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








// data tables
// import { useEffect, useState } from "react";
// import Navbar from "../components/DashboardNavbar";

// import {
//   Eye,
//   Pencil,
//   Search,
//   X,
//   Mail,
//   CalendarDays,
//   Trees,
// } from "lucide-react";

// import DataTable from "react-data-table-component";

// export default function Users() {

//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [editingUser, setEditingUser] = useState(null);

//   // FETCH USERS FROM MONGODB
//   useEffect(() => {

//     fetch("http://localhost:5000/api/users")
//       .then((response) => response.json())
//       .then((data) => {
//         setUsers(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//   }, []);

//   // SEARCH
//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase())
//   );

//   // SAVE EDITED USER
//   const handleSave = () => {

//     setUsers((prev) =>
//       prev.map((user) =>
//         user._id === editingUser._id
//           ? editingUser
//           : user
//       )
//     );

//     setEditingUser(null);
//   };

//   // DATA TABLE COLUMNS
//   const columns = [
//     {
//       name: "User ID",
//       selector: (row) => row.userId,
//       sortable: true,
//     },

//     {
//       name: "Email",
//       selector: (row) => row.email,
//     },

//     {
//       name: "Name",
//       selector: (row) => row.name,
//     },

//     {
//       name: "Date Joined",
//       selector: (row) => row.joinedDate,
//     },

//     {
//       name: "Total Trees Donated",
//       selector: (row) => row.treesDonated,
//       sortable: true,
//     },

//     {
//       name: "Status",
//       cell: (row) => (
//         <span
//           className={
//             row.status === "Active"
//               ? "active-status"
//               : "inactive-status"
//           }
//         >
//           {row.status}
//         </span>
//       ),
//     },

//     {
//       name: "Action",
//       cell: (row) => (
//         <div className="table-actions">

//           {/* VIEW */}
//           <button
//             className="action-circle"
//             onClick={() => setSelectedUser(row)}
//           >
//             <Eye size={13} />
//           </button>

//           {/* EDIT */}
//           <button
//             className="action-circle"
//             onClick={() => setEditingUser(row)}
//           >
//             <Pencil size={13} />
//           </button>

//         </div>
//       ),
//     },
//   ];

//   // DATA TABLE STYLES
//   const customStyles = {
//     rows: {
//       style: {
//         minHeight: "72px",
//         fontSize: "14px",
//         backgroundColor: "#f5fbf5",
//         borderBottom: "1px solid #dfe7df",
//       },
//     },

//     headRow: {
//       style: {
//         backgroundColor: "#f5fbf5",
//         minHeight: "60px",
//         fontWeight: "600",
//         fontSize: "14px",
//       },
//     },

//     table: {
//       style: {
//         borderRadius: "24px",
//         overflow: "hidden",
//       },
//     },
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="users-wrapper">

//         {/* HEADER */}
//         <div className="users-header">

//           <h1 className="users-heading">
//             Users
//           </h1>

//           <div className="search-box">

//             <Search size={16} color="#999" />

//             <input
//               type="text"
//               placeholder="Search"
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//             />

//           </div>
//         </div>

//         {/* DATA TABLE */}
//         <div className="users-card">

//           <DataTable
//             columns={columns}
//             data={filteredUsers}
//             pagination
//             highlightOnHover
//             responsive
//             customStyles={customStyles}
//           />

//         </div>
//       </div>

//       {/* VIEW MODAL */}
//       {selectedUser && (
//         <div className="modal-overlay">

//           <div className="profile-modal">

//             <button
//               className="close-modal"
//               onClick={() => setSelectedUser(null)}
//             >
//               <X size={18} />
//             </button>

//             {/* TOP */}
//             <div className="modal-top">

//               <div className="modal-user-details">

//                 <h1 className="modal-name">
//                   {selectedUser.name}
//                 </h1>

//                 <p className="user-id">
//                   User ID: {selectedUser.userId}
//                 </p>

//                 <div className="tree-count">
//                   <Trees size={15} />
//                   {selectedUser.treesDonated} Trees Donated
//                 </div>

//               </div>
//             </div>

//             {/* INFO */}
//             <div className="modal-info">

//               <div className="info-row">
//                 <Mail size={15} color="#f5a100" />
//                 <p>{selectedUser.email}</p>
//               </div>

//               <div className="info-row">
//                 <CalendarDays size={15} color="#f5a100" />
//                 <p>{selectedUser.joinedDate}</p>
//               </div>

//               {/* STATUS + EDIT */}
//               <div className="modal-bottom">

//                 <div className="status-wrapper">

//                   <div
//                     className={
//                       selectedUser.status === "Active"
//                         ? "status-dot active-dot"
//                         : "status-dot inactive-dot"
//                     }
//                   ></div>

//                   <span
//                     className={
//                       selectedUser.status === "Active"
//                         ? "active-status"
//                         : "inactive-status"
//                     }
//                   >
//                     {selectedUser.status}
//                   </span>

//                 </div>

//                 <button
//                   className="edit-link"
//                   onClick={() => {
//                     setEditingUser(selectedUser);
//                     setSelectedUser(null);
//                   }}
//                 >
//                   Edit
//                 </button>

//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* EDIT MODAL */}
//       {editingUser && (
//         <div className="modal-overlay">

//           <div className="edit-modal">

//             <button
//               className="close-modal"
//               onClick={() => setEditingUser(null)}
//             >
//               <X size={18} />
//             </button>

//             <h1 className="edit-title">
//               Edit User Status
//             </h1>

//             <div className="edit-form">

//               {/* NAME */}
//               <div className="input-group">

//                 <label className="input-label">
//                   Name
//                 </label>

//                 <input
//                   type="text"
//                   className="edit-input"
//                   value={editingUser.name}
//                   disabled
//                 />

//               </div>

//               {/* EMAIL */}
//               <div className="input-group">

//                 <label className="input-label">
//                   Email
//                 </label>

//                 <input
//                   type="email"
//                   className="edit-input"
//                   value={editingUser.email}
//                   disabled
//                 />

//               </div>

//               {/* TREES */}
//               <div className="input-group">

//                 <label className="input-label">
//                   Total Trees Donated
//                 </label>

//                 <input
//                   type="number"
//                   className="edit-input"
//                   value={editingUser.treesDonated}
//                   disabled
//                 />

//               </div>

//               {/* STATUS */}
//               <div className="input-group">

//                 <label className="input-label">
//                   Status
//                 </label>

//                 <select
//                   className="edit-input status-select"
//                   value={editingUser.status}
//                   onChange={(e) =>
//                     setEditingUser({
//                       ...editingUser,
//                       status: e.target.value,
//                     })
//                   }
//                 >
//                   <option>Active</option>
//                   <option>Inactive</option>
//                 </select>

//               </div>

//               <button
//                 className="save-btn"
//                 onClick={handleSave}
//               >
//                 Save Changes
//               </button>

//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
