import { Link } from "react-router-dom";
import Toggle from "./Toggle";
import { useContext, useState } from "react";
import { ProductContext } from "./context/ProductContext";
import App from "./App";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const { editProduct, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleEditProduct = (id) => {
    editProduct(id);
    navigate("/add-product");
  };
  return (
    <App>
      <div className="mainContainer flex flex-col items-center py-10">
        <div className="w-10/12 mx-auto py-5 flex justify-between">
          <button className="bg-white font-bold text-2xl">Products</button>
          <button className="bg-red-700 px-6 py-2 text-white font-bold">
            <Link to={"/add-product"}>Add Product</Link>
          </button>
        </div>
        <div className="w-10/12 mx-auto">
          <table className="min-w-full bg-white">
            <thead className="">
              <tr className="bg-gray-100 text-gray-700">
                <th className="th-style p-2">Sr no</th>
                <th className="th-style p-2">Title</th>
                <th className="th-style">Price</th>
                <th className="th-style">Rcommended</th>
                <th className="th-style">Best Seller</th>
                <th className="th-style">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((product, indexs) => (
                <tr key={product._id}>
                  <td className="td-style">{indexs + 1}</td>
                  <td className="td-style">{product.title}</td>
                  <td className="td-style">{product.price}</td>
                  <td className="td-style">
                    <Toggle status={product.isRecommended} />
                  </td>
                  <td className="td-style">
                    <Toggle status={product.isBestSeller} />
                  </td>
                  <td className="py-2 border-b ">
                    <Toggle status={product.isLive} />
                  </td>
                  <td className="td-style flex gap-1 pl-4">
                    <button
                      className=""
                      onClick={() => {
                        handleEditProduct(product._id);
                      }}
                    >
                      <i className="ri-pencil-line ri-lg"></i>
                    </button>
                    <button
                      className=""
                      onClick={() => {
                        deleteProduct(product._id);
                      }}
                    >
                      <i className="ri-delete-bin-7-line ri-lg"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-10/12 mx-auto py-5 flex justify-end">
          <Pagination onPageChange={setDisplayedProducts} />
        </div>
      </div>
    </App>
  );
};

export default Products;
