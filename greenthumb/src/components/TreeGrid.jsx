import TreeCard from './TreeCard';
import "../Style.css";

const TreeGrid = () => {
  const trees = Array(12).fill(null);

  return (
    <div className="grid-wrapper">
      <h2 className="grid-title">Choose Your Tree</h2>
      <div className="tree-grid">
        {trees.map((_, index) => (
          <TreeCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default TreeGrid;