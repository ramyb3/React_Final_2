import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    ID: 0,
    Name: "",
    Price: 0,
    Quantity: 0,
  });

  const send = () => {
    if (product.Price < 1 || product.Quantity < 1 || product.Name == "") {
      alert("YOU NEED TO FILL ALL THE FORM!!");
    } else {
      dispatch({ type: "addProduct", payload: product });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Add Product:</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setProduct({ ...product, Name: e.target.value })}
      />
      <br />
      <br />
      <input
        type="number"
        placeholder="Price"
        min="1"
        onChange={(e) =>
          setProduct({ ...product, Price: parseInt(e.target.value) })
        }
      />
      <br />
      <br />
      <input
        type="number"
        placeholder="Quantity"
        min="1"
        onChange={(e) =>
          setProduct({ ...product, Quantity: parseInt(e.target.value) })
        }
      />
      <br />
      <br />

      <Link to="/products">
        <button onClick={send}>Add</button>
      </Link>
      <Link to="/products">
        <button>Cancel</button>
      </Link>
    </div>
  );
}
