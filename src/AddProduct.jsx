import { useContext, useEffect, useState } from "react";
import App from "./App";
import { ProductContext } from "./context/ProductContext";

const AddProduct = () => {
  const { addProduct, editableProduct, setEditableProduct } =
    useContext(ProductContext);
  const [errors, setErrors] = useState({});
  const [buttonLabel, setButtonLabel] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    isBestSeller: false,
    isRecommended: false,
    isLive: false,
  });

  useEffect(() => {
    if (editableProduct) {
      setFormData({
        title: editableProduct.title,
        description: editableProduct.description,
        price: editableProduct.price,
        isBestSeller: editableProduct.isBestSeller,
        isRecommended: editableProduct.isRecommended,
        isLive: editableProduct.isLive,
        _id: editableProduct._id,
      });
      const bLabel = editableProduct && "Update Product";
      setButtonLabel(bLabel);
    }
    return () => {
      setEditableProduct(null);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name === "title" && errors.title) {
      setErrors((prev) => ({ ...prev, title: "" }));
    }
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    let newErrors = {};
    e.preventDefault();
    if (formData.title.length < 5)
      newErrors.title = "title must be at least 5 characters.";

    if (formData.title.length < 10)
      newErrors.description = "description must be at least 5 characters.";

    if (formData.price < 0) newErrors.price = "price must be positive number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addProduct(formData);
    }
    setFormData({
      title: "",
      description: "",
      price: "",
      isBestSeller: false,
      isRecommended: false,
      isLive: false,
    });
  };

  return (
    <App>
      <div className="mainContainer flex flex-col items-center justify-center py-10 min-h-screen">
        <div className="w-6/12 mx-auto py-10 px-5 flex justify-between bg-[#e2e2e2]">
          <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
            <input
              name="title"
              type="text"
              placeholder="enter product title"
              className="w-full py-2 rounded pl-2 border"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <span className="text-red-600 text-sm p-0 m-0">
                {errors.title}
              </span>
            )}
            <input
              name="description"
              type="text"
              placeholder="enter product description"
              className="w-full py-2 rounded pl-2 border"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <span className="text-red-600 text-sm p-0 m-0">
                {errors.description}
              </span>
            )}
            <input
              name="price"
              type="number"
              placeholder="enter product price"
              className="w-full py-2 rounded pl-2 border"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <span className="text-red-600 text-sm p-0 m-0">
                {errors.price}
              </span>
            )}
            <div className="flex justify-between mt-2 py-2 px-4 border rounded">
              <label className="flex gap-2 items-center">
                <span>IsBestseller</span>
                <input
                  type="checkbox"
                  name="isBestSeller"
                  className="w-[20px] h-[20px]"
                  checked={formData.isBestSeller}
                  onChange={handleChange}
                />
              </label>

              <label className="flex gap-2 items-center">
                <span>IsRecommended</span>
                <input
                  type="checkbox"
                  name="isRecommended"
                  className="w-[20px] h-[20px]"
                  checked={formData.isRecommended}
                  onChange={handleChange}
                />
              </label>

              <label className="flex gap-2 items-center">
                <span>IsLive</span>
                <input
                  type="checkbox"
                  name="isLive"
                  className="w-[20px] h-[20px]"
                  checked={formData.isLive}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="flex gap-8">
              {" "}
              <button className="bg-blue-600 px-4 py-2 rounded text-white">
                {buttonLabel || buttonLabel || "Add Product"}
              </button>
              <button
                className={`px-4 py-2 rounded border bg-white`}
                onClick={() => {
                  setFormData({
                    title: "",
                    description: "",
                    price: "",
                    isBestSeller: false,
                    isRecommended: false,
                    isLive: false,
                  });
                }}
              >
                Rest Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </App>
  );
};

export default AddProduct;
