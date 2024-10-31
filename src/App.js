import { Link } from "react-router-dom";
import Default from "./Default";
import { useState } from "react";

const App = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex bg-[#e2e2e2] w-full min-h-screen gap-2">
      <div
        className={`${
          open ? "w-[5%]" : "w-[20%]"
        } flex flex-col gap-5 bg-white px-4 py-10 transition-all duration-300`}
      >
        <button
          className={`${
            open ? "text-center bg-[#e2e2e2] p-2 rounded" : "text-right"
          }`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <i className="ri-menu-line ri-lg"></i>
        </button>
        {open ? (
          <div className="flex flex-col gap-4">
            <Link className="bg-[#e2e2e2] p-2 rounded" to={"/add-product"}>
              <i className="ri-sticky-note-add-line ri-lg "></i>
            </Link>
            <Link className="bg-[#e2e2e2] p-2 rounded" to={"/product"}>
              <i className="ri-file-list-line ri-lg"></i>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 transition-all duration-300">
            <Link
              className="bg-[#e2e2e2] px-4 py-2 rounded"
              to={"/add-product"}
            >
              <i className="ri-sticky-note-add-line ri-lg "></i> Add Product
            </Link>
            <Link className="bg-[#e2e2e2] px-4 py-2 rounded" to={"/product"}>
              <i className="ri-file-list-line ri-lg"></i> Product List
            </Link>
          </div>
        )}
      </div>
      <div className={`${open ? "w-[95%]" : "w-[80%]"} bg-white px-4 py-10`}>
        {" "}
        {children || <Default />}
      </div>
    </div>
  );
};

export default App;
