import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./context/ProductContext";

const Pagination = ({ onPageChange }) => {
  const { products } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total page
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    // Slice products for the current pages
    const currentProducts = products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    // Update displayed products in the parents
    onPageChange(currentProducts);
  }, [currentPage, itemsPerPage, products, onPageChange]);

  const hanldePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <div className="flex justify-between gap-4">
      <div>
        <span>Row per page: 10</span>
        {/* <select className="p-0 m-0">
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select> */}
      </div>
      <div>
        <span>{`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
          currentPage * itemsPerPage,
          products.length
        )} of ${products.length}`}</span>
        <button disabled={currentPage === 1} onClick={hanldePreviousPage}>
          <i className="ri-arrow-left-s-line ri-lg"></i>
        </button>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          <i className="ri-arrow-right-s-line ri-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
