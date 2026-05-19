// import { useEffect, useState } from "react";
// import "../Style.css";
// import Navbar from "../components/DashboardNavbar";
// import { Search, Eye, Pencil, X, } from "lucide-react";
// import DataTable from "react-data-table-component";

// export default function Progress() {

//   const [progressData, setProgressData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedProgress, setSelectedProgress] = useState(null);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [editingProgress, setEditingProgress] = useState(null);
//   const [selectedPhoto, setSelectedPhoto] = useState(null);
  
//   // FETCH PROGRESS
//   useEffect(() => {
//     fetch("http://localhost:5000/api/progress")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("PROGRESS DATA:", data);
//         setProgressData(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   // SEARCH
//   const filteredProgress = progressData.filter(
//     (item) =>
//       item.species?.toLowerCase().includes(search.toLowerCase())
//   );
//   // SAVE EDITED STAGE
//   const handleSave = () => {
//     fetch(`http://localhost:5000/api/progress/${editingProgress._id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(editingProgress),
//     })
//       .then((res) => res.json())
//       .then((updatedProgress) => {
//         const updatedData = progressData.map((item) =>
//           item._id === updatedProgress._id
//             ? updatedProgress
//             : item
//         );
//         setProgressData(updatedData);
//         setEditingProgress(null);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   // DATATABLE COLUMNS
//   const columns = [
//     {
//       name: "Tree ID",
//       selector: (row) => row.treeId,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Species",
//       selector: (row) => row.species,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Assigned Farmer",
//       selector: (row) => row.farmer,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Last Update",
//       selector: (row) => row.lastUpdate,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Current Location",
//       selector: (row) => row.location,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Stage",
//       selector: (row) => row.stage,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Next Update Due",
//       selector: (row) => row.nextUpdate,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Photo Upload",
//       center: true,
//       cell: (row) => (
//         <button
//           className="paid-status view-photo-btn"
//           onClick={() => setSelectedPhoto(row.photo)}
//         >
//           View Photo
//         </button>
//       ),
//     },

//     {
//       name: "Action",
//       center: true,
//       cell: (row) => (
//         <div className="table-actions">
//           {/* VIEW */}
//           <button
//             className="action-circle"
//             onClick={() => {
//               setSelectedProgress(row);
//               setShowViewModal(true);
//             }}
//           >
//             <Eye size={14} />
//           </button>
//           {/* EDIT */}
//           <button
//             className="action-circle"
//             onClick={() => setEditingProgress(row)}
//           >
//             <Pencil size={14} />
//           </button>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <>
//       <Navbar />
//       <div className="users-wrapper">
//         {/* HEADER */}
//         <div className="users-header">
//           <h1 className="users-heading">
//             Progress
//           </h1>
//           <div className="search-box">
//             <Search size={14} color="#999" />
//             <input
//               type="text"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>
//         {/* DATATABLE */}
//         <div className="users-card">
//           <DataTable
//             columns={columns}
//             data={filteredProgress}
//             pagination
//             highlightOnHover
//             responsive
//             striped
//             noDataComponent="No progress data found"
//           />
//         </div>
//       </div>
//       {/* VIEW MODAL */}
//       {showViewModal && selectedProgress && (
//         <div className="modal-overlay">
//           <div className="profile-modal">
//             <button
//               className="close-modal"
//               onClick={() => setShowViewModal(false)}
//             >
//               <X size={18} />
//             </button>
//             <h1 className="edit-title">
//               Progress Details
//             </h1>
//             <div className="modal-info">
//               <div className="info-row">
//                 <p>
//                   <strong>Tree ID:</strong>{" "}
//                   {selectedProgress.treeId}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Species:</strong>{" "}
//                   {selectedProgress.species}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Assigned Farmer:</strong>{" "}
//                   {selectedProgress.farmer}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Last Update:</strong>{" "}
//                   {selectedProgress.lastUpdate}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Current Location:</strong>{" "}
//                   {selectedProgress.location}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Stage:</strong>{" "}
//                   {selectedProgress.stage}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Next Update Due:</strong>{" "}
//                   {selectedProgress.nextUpdate}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Photo Upload:</strong>
//                 </p>
//                 <button
//                   className="paid-status view-photo-btn"
//                   onClick={() =>
//                     setSelectedPhoto(selectedProgress?.photo)
//                   }
//                 >
//                   View Photo
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* PHOTO */}
//       {selectedPhoto && (
//         <div className="modal-overlay">
//           <div className="photo-modal">
//             <button
//               className="close-modal"
//               onClick={() => setSelectedPhoto(null)}
//             >
//               <X size={18} />
//             </button>
//             <img
//               src={selectedPhoto}
//               alt="Tree Progress"
//               className="photo-preview"
//             />
//           </div>
//         </div>
//       )}
//       {/* EDIT MODAL */}
//       {editingProgress && (
//         <div className="modal-overlay">
//           <div className="edit-modal">
//             <button
//               className="close-modal"
//               onClick={() => setEditingProgress(null)}
//             >
//               <X size={18} />
//             </button>
//             <h1 className="edit-title">
//               Edit Progress Status
//             </h1>
//             <div className="edit-form">
//               {/* TREE ID */}
//               <div className="input-group">
//                 <label className="input-label">
//                   Tree ID
//                 </label>
//                 <input
//                   type="text"
//                   className="edit-input"
//                   value={editingProgress.treeId}
//                   disabled
//                 />
//               </div>
//               {/* SPECIES */}
//               <div className="input-group">
//                 <label className="input-label">
//                   Species
//                 </label>
//                 <input
//                   type="text"
//                   className="edit-input"
//                   value={editingProgress.species}
//                   disabled
//                 />
//               </div>
//               {/* ASSIGNED FARMER */}
//               <div className="input-group">
//                 <label className="input-label">
//                   Assigned Farmer
//                 </label>
//                 <input
//                   type="text"
//                   className="edit-input"
//                   value={editingProgress.farmer}
//                   disabled
//                 />
//               </div>
//               {/* CURRENT LOCATION */}
//               <div className="input-group">
//                 <label className="input-label">
//                   Current Location
//                 </label>
//                 <input
//                   type="text"
//                   className="edit-input"
//                   value={editingProgress.location}
//                   disabled
//                 />
//               </div>
//               {/* STAGE */}
//               <div className="input-group">
//                 <label className="input-label">
//                   Stage
//                 </label>
//                 <select
//                   className="edit-input status-select"
//                   value={editingProgress.stage}
//                   onChange={(e) =>
//                     setEditingProgress({
//                       ...editingProgress,
//                       stage: e.target.value,
//                     })
//                   }
//                 >
//                   <option>Seedling</option>
//                   <option>Growing</option>
//                   <option>Mature</option>
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


import { useEffect, useState, useRef } from "react";
import "../Style.css";
import Navbar from "../components/DashboardNavbar";
import { Search, Eye, Pencil, Upload, X } from "lucide-react";
import DataTable from "react-data-table-component";

export default function Progress() {
  const [progressData, setProgressData]       = useState([]);
  const [search, setSearch]                   = useState("");
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [editingProgress, setEditingProgress] = useState(null);
  const [selectedPhoto, setSelectedPhoto]     = useState(null);
  const [uploadingProgress, setUploadingProgress] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/progress")
      .then(res => res.json())
      .then(data => setProgressData(data))
      .catch(err => console.log(err));
  }, []);

  // Build farmer dropdown from existing records
  // ✅ 3 default farmers always appear + any new ones added via edits
const defaultFarmers = ["Unassigned", "Jose Cruz", "Anna Santos", "Peter Rizal"];
const farmerOptions = [
  ...new Set([
    ...defaultFarmers,
    ...progressData
      .map(p => p.farmer)
      .filter(f => f && !defaultFarmers.includes(f)),
  ]),
];

  const filteredProgress = progressData.filter(item =>
    item.species?.toLowerCase().includes(search.toLowerCase()) ||
    item.userId?.toLowerCase().includes(search.toLowerCase()) ||
    item.donationId?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    fetch(`http://localhost:5000/api/progress/${editingProgress._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        farmer:     editingProgress.farmer,
        location:   editingProgress.location,
        stage:      editingProgress.stage,
        nextUpdate: editingProgress.nextUpdate,
      }),
    })
      .then(res => res.json())
      .then(() => {
        // Keep enriched data, just update changed fields
        setProgressData(prev => prev.map(item =>
          item._id === editingProgress._id ? { ...item, ...editingProgress } : item
        ));
        setEditingProgress(null);
      })
      .catch(err => console.log(err));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !uploadingProgress) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      fetch(`http://localhost:5000/api/progress/${uploadingProgress._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo: reader.result }),
      })
        .then(res => res.json())
        .then(() => {
          // Keep enriched data, just update the photo field
          setProgressData(prev => prev.map(item =>
            item._id === uploadingProgress._id
              ? { ...item, photo: reader.result }
              : item
          ));
          setUploadingProgress(null);
          e.target.value = "";
        })
        .catch(err => console.log(err));
    };
    reader.readAsDataURL(file);
  };

  const columns = [
    { name: "Donation ID",     selector: row => row.donationId  || "N/A", sortable: true, center: true },
    { name: "User ID",         selector: row => row.userId       || "N/A", sortable: true, center: true },
    { name: "Species",         selector: row => row.species      || "N/A", sortable: true, center: true },
    { name: "Quantity",        selector: row => row.quantity     || 1,     sortable: true, center: true },
    { name: "Farmer",          selector: row => row.farmer       || "N/A", sortable: true, center: true },
    { name: "Location",        selector: row => row.location     || "N/A", sortable: true, center: true },
    { name: "Last Update",     selector: row => row.lastUpdate   || "N/A", sortable: true, center: true },
    { name: "Stage",           selector: row => row.stage        || "N/A", sortable: true, center: true },
    { name: "Next Update Due", selector: row => row.nextUpdate   || "N/A", sortable: true, center: true },
    {
      name: "Photo",
      center: true,
      cell: row => (
        <button
          className="paid-status view-photo-btn"
          onClick={() => row.photo ? setSelectedPhoto(row.photo) : alert("No photo uploaded yet")}
        >
          View
        </button>
      ),
    },
    {
      name: "Action",
      center: true,
      cell: row => (
        <div className="table-actions">
          <button className="action-circle" onClick={() => setSelectedProgress(row)}>
            <Eye size={14} />
          </button>
          <button className="action-circle" onClick={() => setEditingProgress({ ...row })}>
            <Pencil size={14} />
          </button>
          <button
            className="action-circle"
            title="Upload Photo"
            onClick={() => { setUploadingProgress(row); fileInputRef.current.click(); }}
          >
            <Upload size={14} />
          </button>
        </div>
      ),
    },
  ];

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
              placeholder="Search by species, user ID, or donation ID"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="users-card">
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
          <DataTable
            columns={columns}
            data={filteredProgress}
            pagination
            highlightOnHover
            responsive
            striped
            noDataComponent="No progress data found"
          />
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedProgress && (
        <div className="modal-overlay">
          <div className="profile-modal">
            <button className="close-modal" onClick={() => setSelectedProgress(null)}><X size={18} /></button>
            <h1 className="edit-title">Progress Details</h1>
            <div className="modal-info">
              {[
                ["Donation ID",    selectedProgress.donationId],
                ["User ID",        selectedProgress.userId],
                ["Donor Name",     selectedProgress.donorName],
                ["Species",        selectedProgress.species],
                ["Quantity",       selectedProgress.quantity],
                ["Assigned Farmer",selectedProgress.farmer],
                ["Last Update",    selectedProgress.lastUpdate],
                ["Location",       selectedProgress.location],
                ["Specific Site",  selectedProgress.specificSite],
                ["Stage",          selectedProgress.stage],
                ["Next Update Due",selectedProgress.nextUpdate],
              ].map(([label, value]) => (
                <div className="info-row" key={label}>
                  <p><strong>{label}:</strong> {value || "N/A"}</p>
                </div>
              ))}
              <div className="info-row">
                <p><strong>Photo:</strong></p>
                <button
                  className="paid-status view-photo-btn"
                  onClick={() => selectedProgress.photo ? setSelectedPhoto(selectedProgress.photo) : alert("No photo uploaded yet")}
                >
                  View Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHOTO MODAL */}
      {selectedPhoto && (
        <div className="modal-overlay">
          <div className="photo-modal">
            <button className="close-modal" onClick={() => setSelectedPhoto(null)}><X size={18} /></button>
            <img src={selectedPhoto} alt="Tree Progress" className="photo-preview" />
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingProgress && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <button className="close-modal" onClick={() => setEditingProgress(null)}><X size={18} /></button>
            <h1 className="edit-title">Edit Progress</h1>
            <div className="edit-form">
              <div className="input-group">
                <label className="input-label">Donation ID</label>
                <input type="text" className="edit-input" value={editingProgress.donationId || ""} disabled />
              </div>
              <div className="input-group">
                <label className="input-label">User ID</label>
                <input type="text" className="edit-input" value={editingProgress.userId || ""} disabled />
              </div>
              <div className="input-group">
                <label className="input-label">Species</label>
                <input type="text" className="edit-input" value={editingProgress.species || ""} disabled />
              </div>
              <div className="input-group">
                <label className="input-label">Assigned Farmer</label>
                <select
                  className="edit-input status-select"
                  value={editingProgress.farmer || "Unassigned"}
                  onChange={e => setEditingProgress({ ...editingProgress, farmer: e.target.value })}
                >
                  {farmerOptions.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Location</label>
                <input
                  type="text"
                  className="edit-input"
                  value={editingProgress.location || ""}
                  onChange={e => setEditingProgress({ ...editingProgress, location: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Next Update Due</label>
                <input
                  type="date"
                  className="edit-input"
                  value={editingProgress.nextUpdate || ""}
                  onChange={e => setEditingProgress({ ...editingProgress, nextUpdate: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label className="input-label">Stage</label>
                <select
                  className="edit-input status-select"
                  value={editingProgress.stage || "Seedling"}
                  onChange={e => setEditingProgress({ ...editingProgress, stage: e.target.value })}
                >
                  <option>Seedling</option>
                  <option>Growing</option>
                  <option>Mature</option>
                </select>
              </div>
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}