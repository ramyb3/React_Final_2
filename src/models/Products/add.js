import { useSaveDispatch } from "../menu";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const { saveForm } = useSaveDispatch();

  const [product, setProduct] = useState({
    ID: 0,
    Name: "",
    Price: 0,
    Quantity: 0,
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
      <h2>Add Product:</h2>

      <input
        placeholder="Name"
        onChange={(e) => setProduct({ ...product, Name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        min="1"
        onChange={(e) =>
          setProduct({ ...product, Price: parseInt(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Quantity"
        min="1"
        onChange={(e) =>
          setProduct({ ...product, Quantity: parseInt(e.target.value) })
        }
      />

      <div style={{ display: "flex", gap: "5px" }}>
        <Link to="/products">
          <button onClick={() => saveForm("addProduct", product, true)}>
            Add
          </button>
        </Link>
        <Link to="/products">
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
}
