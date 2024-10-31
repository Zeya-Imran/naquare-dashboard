import { createContext, useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [editableProduct, setEditableProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get(`/api/v1/products`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  //add product
  const addProduct = async (newProdcut) => {
    console.log("for update", newProdcut);
    try {
      if (newProdcut._id) {
        const { data } = await axiosInstance.put(
          `${`/api/v1/products`}/${newProdcut._id}`,
          newProdcut
        );
        console.log("after update", data);
        if (!data) throw new Error("unable to fetch data");
        setProducts((prev) =>
          prev.map((product) => (product._id === data._id ? data : product))
        );
        toast.success("product updated!!!");
      } else {
        const { data } = await axiosInstance.post(
          `/api/v1/products`,
          newProdcut
        );
        if (!data) throw new Error("unable to fetch data");
        setProducts((prev) => [...prev, data]);
        toast.success("product added!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //edit product
  const editProduct = async (id) => {
    let forEditProduct = products.find((items) => items._id === id);
    setEditableProduct(forEditProduct);
  };

  //edit product
  const deleteProduct = async (id) => {
    const confirm = window.confirm("Are sure?, do you want to delete");
    if (!confirm) return false;
    try {
      const response = await axiosInstance.delete(`${URL}${id}`);
      if (response.status !== 204) throw new Error("unable to delete request");
      toast.success("Product Deleted!!!");
      const updatedProducts = products.filter((items) => items._id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        editProduct,
        deleteProduct,
        editableProduct,
        setEditableProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
