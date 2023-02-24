import { useSaveDispatch } from "../menu";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const { saveForm } = useSaveDispatch();

  const [customer, setCustomer] = useState({
    ID: 0,
    Fname: "",
    Lname: "",
    City: "",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <h2>Add Customer:</h2>

      <input
        placeholder="First Name"
        onChange={(e) => setCustomer({ ...customer, Fname: e.target.value })}
      />
      <input
        placeholder="Last Name"
        onChange={(e) => setCustomer({ ...customer, Lname: e.target.value })}
      />
      <input
        placeholder="City"
        onChange={(e) => setCustomer({ ...customer, City: e.target.value })}
      />

      <div style={{ display: "flex", gap: "5px" }}>
        <Link to="/customers">
          <button onClick={() => saveForm("addCustomer", customer, false)}>
            Add
          </button>
        </Link>
        <Link to="/customers">
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
}
