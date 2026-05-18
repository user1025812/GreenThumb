import { useEffect, useState } from "react";
import Navbar from "../components/DashboardNavbar";
import { Search, Eye } from "lucide-react";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  /* FETCH PAYMENTS */
  useEffect(() => {
    fetch("http://localhost:5000/api/payments")
      .then((response) => response.json())
      .then((data) => {
        console.log("PAYMENTS:", data);

        setPayments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /* SEARCH */
  const filteredPayments = payments.filter((payment) =>
    payment.donor.toLowerCase().includes(search.toLowerCase())
  );

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
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="users-card">
          <table className="users-table payment-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Donation ID</th>
                <th>Donation Name</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Reference No.</th>
                <th>Date Paid</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.transactionId}</td>
                  <td>{payment.donationId}</td>
                  <td>{payment.donor}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.method}</td>
                  <td>{payment.reference}</td>
                  <td>{payment.date}</td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="action-circle"
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowViewModal(true);
                        }}
                      >
                        <Eye size={14} />
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
{showViewModal && selectedPayment && (
  <div className="modal-overlay">
    <div className="profile-modal">
      <button
        className="close-modal"
        onClick={() => setShowViewModal(false)}
      >
        ✕
      </button>

      <h1 className="edit-title">
        Payment Details
      </h1>

      <div className="modal-info">

        <div className="info-row">
          <p>
            <strong>Transaction ID:</strong>{" "}
            {selectedPayment.transactionId}
          </p>
        </div>

        <div className="info-row">
          <p>
            <strong>Donation ID:</strong>{" "}
            {selectedPayment.donationId}
          </p>
        </div>

        <div className="info-row">
          <p>
            <strong>Donor:</strong>{" "}
            {selectedPayment.donor}
          </p>
        </div>

        <div className="info-row">
          <p>
            <strong>Amount:</strong>{" "}
            {selectedPayment.amount}
          </p>
        </div>

        <div className="info-row">
          <p>
            <strong>Payment Method:</strong>{" "}
            {selectedPayment.method}
          </p>
        </div>

        <div className="info-row">
          <p>
            <strong>Reference No:</strong>{" "}
            {selectedPayment.reference}
          </p>
        </div>

        <div className="info-row">
          <p>
            <strong>Date Paid:</strong>{" "}
            {selectedPayment.date}
          </p>
        </div>

      </div>
    </div>
  </div>
)}
    </>
  );
}