import { useParams } from "react-router-dom";
import trees from "../components/library/treesData";

function TreeDetails() {
  const { id } = useParams();

  const selectedTree = trees.find(
    (tree) => tree.id === Number(id)
  );

  return (
    <div className="details-page">
      <h1>{selectedTree.name}</h1>
      <div className="details-container">
        <div className="details-left">
          <div className="details-box">
            <p>
              <strong>Botanical Name:</strong>{" "}
              {selectedTree.botanical}
            </p>

            <p>
              <strong>Family Name:</strong>{" "}
              {selectedTree.family}
            </p>

            <p>
              <strong>IUCN Conservation Status:</strong>{" "}
              {selectedTree.conservation}
            </p>
          </div>

          <div className="description-box">
            <p>{selectedTree.description}</p>
          </div>
        </div>

        <div className="details-right">
          <img
            src={selectedTree.image}
            alt={selectedTree.name}
            className="details-image"
          />
        </div>
      </div>
    </div>
  );
}

export default TreeDetails;