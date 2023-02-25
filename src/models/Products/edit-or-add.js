import Add from "../add-layout";
import Edit from "../edit-layout";
import { useState } from "react";

export default function EditOrAddProduct(props) {
  const [product, setProduct] = useState({
    ID: 0,
    Name: "",
    Price: 0,
    Quantity: 0,
  });

  return props.edit ? (
    <Edit
      headline="Product"
      link="/products"
      secondLink="/customers/editCustomer/"
      dispatch={["updateProduct", true, "deleteProduct"]}
      data={product}
      setData={setProduct}
    />
  ) : (
    <Add
      headline="Product"
      link="/products"
      dispatch={["addProduct", true]}
      data={product}
      setData={setProduct}
    />
  );
}
