import "./App.css";
import Menu from "./models/menu";
import MainPage from "./models/main-page-layout";
import EditOrAddProduct from "./models/Products/edit-or-add";
import EditOrAddCustomer from "./models/Customers/edit-or-add";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import emailjs from "emailjs-com";

export default function App() {
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
    <>
      <h1 style={{ textAlign: "center" }}>Store Project</h1>

      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="products" element={<MainPage comp={true} />} />
          <Route path="customers" element={<MainPage comp={false} />} />
          <Route
            path="products/editProduct/:id"
            element={<EditOrAddProduct edit={true} />}
          />
          <Route
            path="customers/editCustomer/:id"
            element={<EditOrAddCustomer edit={true} />}
          />
          <Route
            path="products/addProduct"
            element={<EditOrAddProduct edit={false} />}
          />
          <Route
            path="customers/addCustomer"
            element={<EditOrAddCustomer edit={false} />}
          />
        </Route>
      </Routes>
    </>
  );
}
