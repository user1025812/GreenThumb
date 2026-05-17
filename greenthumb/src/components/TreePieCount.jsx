import "../Style.css";

const TreePieCount = () => {
    return (
        <div className="flex flex-col gap-5 justify-center items-center">

            <div className="flex flex-col items-center justify-center text-white rounded-full shadow-lg px-12 py-5 w-72"
                style={{ backgroundColor: "#ee9b00" }}>
                <span className="text-3xl font-bold">23</span>
                <span className="text-sm mt-1 text-center">Local Farmers Supported</span>
            </div>

            <div className="flex flex-col items-center justify-center text-white rounded-full shadow-lg px-12 py-5 w-72"
                style={{ backgroundColor: "#ee9b00" }}>
                <span className="text-2xl font-bold">₱ 43,325.00</span>
                <span className="text-sm mt-1 text-center">Funds Raised for Planting</span>
            </div>

        </div>
    );
};

export default TreePieCount;