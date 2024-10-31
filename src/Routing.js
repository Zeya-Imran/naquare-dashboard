import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import Products from "./Products";
import AddProduct from "./AddProduct";
import App from "./App";
import { ProductProvider } from "./context/ProductContext";
const Routing = () => {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<App />} />
          <Route path="/product" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Router>
      </BrowserRouter>
    </ProductProvider>
  );
};

export default Routing;
