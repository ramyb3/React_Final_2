import "./App.css";
import MenuComp from "./models/menu";
import ProductsComp from "./models/Products/products";
import CustomersComp from "./models/Customers/customers";
import EditProductComp from "./models/Products/edit";
import EditCustomerComp from "./models/Customers/edit";
import AddProductComp from "./models/Products/add";
import AddCustomerComp from "./models/Customers/add";
import { Route, Routes } from "react-router-dom";
import emailjs from "emailjs-com";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const templateParams = {
      message: `react-redux:\n${navigator.userAgent};\nresolution: ${window.screen.width} X ${window.screen.height}`,
    };
    emailjs.send(
      process.env.REACT_APP_EMAIL_JS_SERVICE,
      process.env.REACT_APP_EMAIL_JS_TEMPLATE,
      templateParams,
      process.env.REACT_APP_EMAIL_JS_USER
    );
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Store Project</h1>

      <Routes>
        <Route path="/" element={<MenuComp />}>
          <Route path="products" element={<ProductsComp />} />
          <Route path="customers" element={<CustomersComp />} />

          <Route
            path="products/editProduct/:id"
            element={<EditProductComp />}
          />
          <Route
            path="customers/editCustomer/:id"
            element={<EditCustomerComp />}
          />

          <Route path="products/addProduct" element={<AddProductComp />} />
          <Route path="customers/addCustomer" element={<AddCustomerComp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
