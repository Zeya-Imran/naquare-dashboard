import { useContext } from "react";
import { ProductContext } from "./context/ProductContext";

const Default = () => {
  const { products } = useContext(ProductContext);
  const productInfo = { bestSeller: 0, recommended: 0, status: 0 };
  products.map((product) => {
    if (product.isBestSeller === true) {
      productInfo.bestSeller += 1;
    }
    if (product.isLive === true) {
      productInfo.status += 1;
    }
    if (product.isRecommended === true) {
      productInfo.recommended += 1;
    }
    return productInfo;
  });

  return (
    <div>
      <h1 className="text-lg text-slate-900">Welcome, NSquare Dashboard</h1>
      <div className="grid grid-cols-4 py-20 gap-4">
        <div className=" p-4 bg-[#e2e2e2] flex justify-between">
          <h2 className="text-lg font-semibold">Recommended</h2>
          <h1 className="text-lg font-bold">{productInfo.recommended}</h1>
        </div>
        <div className=" p-4 bg-[#e2e2e2] flex justify-between">
          <h2 className="text-lg font-semibold">Best Seller</h2>
          <h1 className="text-lg font-bold">{productInfo.bestSeller}</h1>
        </div>
        <div className=" p-4 bg-[#e2e2e2] flex justify-between">
          <h2 className="text-lg font-semibold">Live product</h2>
          <h1 className="text-lg font-bold">{productInfo.status}</h1>
        </div>
        <div className=" p-4 bg-[#e2e2e2] flex justify-between">
          <h2 className="text-lg font-semibold">Product count</h2>{" "}
          <h1 className="text-lg font-bold">{products.length}</h1>
        </div>
        <div className=" p-4 bg-[#e2e2e2] col-span-3">
          <div className="w-auto h-[250px]">
            <p className="text-lg font-semibold">Life Time Revenue</p>
          </div>
        </div>
        <div className="p-4 text-lg font-semibold bg-[#e2e2e2]">
          Today' Sales
        </div>
      </div>
    </div>
  );
};

export default Default;
