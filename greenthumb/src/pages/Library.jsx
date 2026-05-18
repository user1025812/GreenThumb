import TreeCard from "../components/library/TreeCard";
import trees from "../components/library/treesData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Library() {
  return (
    <div className="App min-h-screen bg-white font-sans text-gray-900" >
      <Navbar />

      <div className="header-section" style={{marginTop:"8rem"}}>
        <h1 style={{ marginBottom:"2rem"}}>Rooted in the Philippines</h1>
        <p style={{ textAlign: "center", maxWidth: "800px", margin: "auto", width: "100%" }}>
          Restore the rhythm of our forests. This educational hub 
          features the diverse flora native to our 7,641 islands. 
          Learn about their unique characteristics, ecological 
          benefits, and how your donation helps secure their future.
        </p>
        <button>Protect Our Forests</button>
      </div>

      <div className="trees-grid" style={{ marginBottom: '4rem' }}>
        {trees.map((tree) => (
          <TreeCard key={tree.id} tree={tree} />
        ))}
      </div>

      <Footer />  
    </div>
  );
}

export default Library;