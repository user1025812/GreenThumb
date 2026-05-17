import { useState } from "react";
import { Leaf, X } from "lucide-react";

function TreeCard({ tree }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {/*TREE CARD*/}
      <div className="tree-card">
        <img
          src={tree.image}
          alt={tree.name}
          className="tree-image"
        />

        <div className="tree-content">
          <h2>{tree.name}</h2>
          <button
            className="tree-button"
            onClick={() => setOpenModal(true)}
          >
            Tree Details
            <Leaf size={14} />
          </button>
        </div>
      </div>

      {/*TREE DETAILS MODAL*/}
      {openModal && (
        <div className="modal-overlay">
          <div className="tree-modal">
            {/* CLOSE BUTTON */}
            <button
              className="close-btn"
              onClick={() => setOpenModal(false)}
            >
              <X size={24} />
            </button>
            {/* LEFT SIDE */}
            <div className="modal-left">
              <h1>{tree.name}</h1>
              <div className="tree-info-box">
                <p>
                  Botanical Name:
                  <span> {tree.name}</span>
                </p>

                <p>
                  Family Name:
                  <span> {tree.familyName}</span>
                </p>

                <p>
                  IUCN Conservation Status:
                  <span> {tree.conservationStatus}</span>
                </p>

              </div>

              <div className="tree-description">
                <p>{tree.description}</p>
              </div>

              <small>
                Source: {tree.source}
              </small>

            </div>
            {/*RIGHT SIDE*/}
            <div className="modal-right">
              <img
                src={tree.image}
                alt={tree.name}
                className="main-modal-image"
              />

              <div className="small-images">
                <img
                  src={tree.image}
                  alt={tree.name}
                />

                <img
                  src={tree.image}
                  alt={tree.name}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TreeCard;