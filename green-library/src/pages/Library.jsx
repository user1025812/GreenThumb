import TreeCard from "../components/library/TreeCard";
import trees from "../components/library/treesData";
import Navbar from "../components/Navbar";

function Library() {
  return (
   
    <div className="library-page">
 <Navbar />
      {/* HEADER */}
      <div className="header-section">
        <h1>Rooted in the Philippines</h1>

        <p>
          Restore the rhythm of our forests. This educational hub 
          features the diverse flora native to our 7,641 islands. 
          Learn about their unique characteristics, ecological 
          benefits, and how your donation helps secure their future.
        </p>

        <button>Protect Our Forests</button>
      </div>

      {/* TREE GRID */}
      <div className="trees-grid">
        {trees.map((tree) => (
          <TreeCard
            key={tree.id}
            tree={tree}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;