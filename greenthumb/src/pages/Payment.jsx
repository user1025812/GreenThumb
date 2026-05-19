// import { useEffect, useState } from "react";
// import "../Style.css";
// import Navbar from "../components/DashboardNavbar";
// import { Search, Eye, X, } from "lucide-react";
// import DataTable from "react-data-table-component";

// export default function Payment() {

//   const [payments, setPayments] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [showViewModal, setShowViewModal] = useState(false);

//   /* FETCH PAYMENTS */
//   useEffect(() => {
//     fetch("http://localhost:5000/api/payments")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("PAYMENTS:", data);
//         setPayments(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   /* SEARCH */
//   const filteredPayments = payments.filter(
//     (payment) =>
//       payment.donor?.toLowerCase().includes(search.toLowerCase())
//   );
//   // DATATABLE COLUMNS
//   const columns = [
//     {
//       name: "Transaction ID",
//       selector: (row) => row.transactionId,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Donation ID",
//       selector: (row) => row.donationId,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Donation Name",
//       selector: (row) => row.donor,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Amount",
//       selector: (row) => row.amount,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Payment Method",
//       selector: (row) => row.method,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Reference No.",
//       selector: (row) => row.reference,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Date Paid",
//       selector: (row) => row.datePaid || "N/A",
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Status",
//       selector: (row) => row.datePaid,
//       sortable: true,
//       center: true,
//       cell: (row) => (
//         <span className={`status-badge ${row.datePaid === "Paid" ? "paid" : "pending"}`}>
//           {row.datePaid || "Pending"}
//         </span>
//       ),
//     },
    
//     {
//       name: "Action",
//       center: true,
//       cell: (row) => (
//         <div className="table-actions">
//           <button
//             className="action-circle"
//             onClick={() => {
//               setSelectedPayment(row);
//               setShowViewModal(true);
//             }}
//           >
//             <Eye size={14} />
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
//             Payment
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
//             data={filteredPayments}
//             pagination
//             highlightOnHover
//             responsive
//             striped
//             noDataComponent="No payments found"
//           />
//         </div>
//       </div>
//       {/* VIEW MODAL */}
//       {showViewModal && selectedPayment && (
//         <div className="modal-overlay">
//           <div className="profile-modal">
//             <button
//               className="close-modal"
//               onClick={() => setShowViewModal(false)}
//             >
//               <X size={18} />
//             </button>
//             <h1 className="edit-title">
//               Payment Details
//             </h1>
//             <div className="modal-info">
//               <div className="info-row">
//                 <p>
//                   <strong>Transaction ID:</strong>{" "}
//                   {selectedPayment.transactionId}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Donation ID:</strong>{" "}
//                   {selectedPayment.donationId}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Donor:</strong>{" "}
//                   {selectedPayment.donor}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Amount:</strong>{" "}
//                   {selectedPayment.amount}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Payment Method:</strong>{" "}
//                   {selectedPayment.method}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Reference No:</strong>{" "}
//                   {selectedPayment.reference}
//                 </p>
//               </div>
//               <div className="info-row">
//                 <p>
//                   <strong>Date Paid:</strong>{" "}
//                   {selectedPayment.date}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import "../Style.css";
import Navbar from "../components/DashboardNavbar";
import { Search, Eye, Pencil, X } from "lucide-react";
import DataTable from "react-data-table-component";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredPayments = payments.filter(
    (p) =>
      p.donor?.toLowerCase().includes(search.toLowerCase()) ||
      p.donationId?.toLowerCase().includes(search.toLowerCase()) ||
      p.transactionId?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    fetch(`http://localhost:5000/api/payments/${editingPayment._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingPayment),
    })
      .then((res) => res.json())
      .then((updated) => {
        setPayments((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
        setEditingPayment(null);
      })
      .catch((err) => console.log(err));
  };

  const isPaid = (datePaid) => datePaid && datePaid !== "Pending";

  const columns = [
    { name: "Transaction ID", selector: (row) => row.transactionId, sortable: true, center: true },
    { name: "Donation ID", selector: (row) => row.donationId, sortable: true, center: true },
    { name: "Donor", selector: (row) => row.donor, sortable: true, center: true },
    { name: "Amount", selector: (row) => `₱ ${row.amount}`, sortable: true, center: true },
    {
  name: "Location",
  selector: (row) => row.location || "N/A",
  sortable: true,
  center: true,
},
    { name: "Method", selector: (row) => row.method, sortable: true, center: true },
    // { name: "Reference No.", selector: (row) => row.reference, sortable: true, center: true },
    { name: "Date Paid", selector: (row) => isPaid(row.datePaid) ? row.datePaid : "—", sortable: true, center: true },
    {
      name: "Status",
      center: true,
      cell: (row) => (
        <span className={`status-badge ${isPaid(row.datePaid) ? "paid" : "pending"}`}>
          {isPaid(row.datePaid) ? "Paid" : "Pending"}
        </span>
      ),
    },
    {
  name: "Tree Species",
  selector: (row) => row.tree || "N/A",
  sortable: true,
  center: true,
},
{
  name: "Quantity",
  selector: (row) => row.quantity || 1,
  sortable: true,
  center: true,
},
{
  name: "Location",
  selector: (row) => row.location || "N/A",
  sortable: true,
  center: true,
},
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="table-actions">
          <button className="action-circle" onClick={() => setSelectedPayment(row)}>
            <Eye size={14} />
          </button>
          <button className="action-circle" onClick={() => setEditingPayment({ ...row })}>
            <Pencil size={14} />
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
          <h1 className="users-heading">Payment</h1>
          <div className="search-box">
            <Search size={14} color="#999" />
            <input
              type="text"
              placeholder="Search by donor, donation ID, or transaction ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="users-card">
          <DataTable
            columns={columns}
            data={filteredPayments}
            pagination
            highlightOnHover
            responsive
            striped
            noDataComponent="No payments found"
          />
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedPayment && (
        <div className="modal-overlay">
          <div className="profile-modal">
            <button className="close-modal" onClick={() => setSelectedPayment(null)}>
              <X size={18} />
            </button>
            <h1 className="edit-title">Payment Details</h1>
            <div className="modal-info">
              {[
                ["Transaction ID", selectedPayment.transactionId],
                ["Donation ID", selectedPayment.donationId],
                ["Donor", selectedPayment.donor],
                ["Amount", `₱ ${selectedPayment.amount}`],
                ["Payment Method", selectedPayment.method],
                ["Reference No.", selectedPayment.reference],
                ["Date Paid", isPaid(selectedPayment.datePaid) ? selectedPayment.datePaid : "Pending"],
                ["Status", isPaid(selectedPayment.datePaid) ? "Paid" : "Pending"],
              ].map(([label, value]) => (
                <div className="info-row" key={label}>
                  <p><strong>{label}:</strong> {value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingPayment && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <button className="close-modal" onClick={() => setEditingPayment(null)}>
              <X size={18} />
            </button>
            <h1 className="edit-title">Edit Payment</h1>
            <div className="edit-form">
              {[
                ["Transaction ID", "transactionId"],
                ["Donation ID", "donationId"],
                ["Donor", "donor"],
                ["Amount", "amount"],
              ].map(([label, key]) => (
                <div className="input-group" key={key}>
                  <label className="input-label">{label}</label>
                  <input type="text" className="edit-input" value={editingPayment[key] || ""} disabled />
                </div>
              ))}
              <div className="input-group">
                <label className="input-label">Date Paid</label>
                <input
                  type="date"
                  className="edit-input"
                  value={isPaid(editingPayment.datePaid) ? editingPayment.datePaid : ""}
                  onChange={(e) =>
                    setEditingPayment({ ...editingPayment, datePaid: e.target.value })
                  }
                />
              </div>
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}