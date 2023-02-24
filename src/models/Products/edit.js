import Edit from "../edit-layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const storeData = useSelector((state) => state);
  const params = useParams();

  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState({
    ID: 0,
    Name: "",
    Price: 0,
    Quantity: 0,
  });

  useEffect(() => {
    const obj = storeData[0][1].find((x) => x.ID == params.id);
    let arr = storeData[0][2].filter((x) => x.ProductID == params.id);
    const arr1 = [];

    for (let i = 0; i < arr.length; i++) {
      const check = storeData[0][0].find((x) => x.ID == arr[i].CustomerID);
      arr1.push(check);
    }

    arr = [];

    let temp = arr1.map((x) => x.ID);
    temp = temp.filter((x, index) => temp.indexOf(x) == index);

    for (let i = 0; i < temp.length; i++) {
      arr.push(arr1.find((x) => x.ID == temp[i]));
    }

    setCustomers(arr);

    setProduct({
      ID: obj.ID,
      Name: obj.Name,
      Price: obj.Price,
      Quantity: obj.Quantity,
    });
  }, []);

  return (
    <Edit
      headline="Product"
      link="/products"
      secondLink="/customers/editCustomer/"
      dispatch={["updateProduct", true, "deleteProduct"]}
      mainData={product}
      setData={setProduct}
      secondData={customers}
    />
  );
}
