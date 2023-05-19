import "./App.css";
import Menu from "./models/menu";
import MainPage from "./models/main-page-layout";
import EditOrAddProduct from "./models/Products/edit-or-add";
import EditOrAddCustomer from "./models/Customers/edit-or-add";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  useEffect(() => {
    const sendMail = async () => {
      try {
        const response = await axios(
          `https://api.apicagent.com/?ua=${navigator.userAgent}`
        );

        const body = {
          resolution: `${window.screen.width} X ${window.screen.height}`,
          response: JSON.stringify(response.data, null, 2),
          name: `react-redux - ${
            JSON.stringify(response.data).toLowerCase().includes("mobile")
              ? "Mobile"
              : "Desktop"
          }`,
        };

        await axios.post(process.env.REACT_APP_MAIL, body);
      } catch (e) {
        console.error(e);
      }
    };

    sendMail();
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
