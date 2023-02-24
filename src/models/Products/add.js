import Add from "../add-layout";
import { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    ID: 0,
    Name: "",
    Price: 0,
    Quantity: 0,
  });

  return (
    <Add
      headline="Product"
      link="/products"
      dispatch={["addProduct", true]}
      data={product}
      setData={setProduct}
    />
  );
}
