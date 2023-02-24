import Edit from "../edit-layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function EditCustomer() {
  const storeData = useSelector((state) => state);
  const params = useParams();

  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState({
    ID: 0,
    Fname: "",
    Lname: "",
    City: "",
  });

  useEffect(() => {
    const obj = storeData[0][0].find((x) => x.ID == params.id);
    let arr = storeData[0][2].filter((x) => x.CustomerID == params.id);
    const arr1 = [];

    for (let i = 0; i < arr.length; i++) {
      const check = storeData[0][1].find((x) => x.ID == arr[i].ProductID);
      arr1.push(check);
    }

    arr = [];

    let temp = arr1.map((x) => x.ID);
    temp = temp.filter((x, index) => temp.indexOf(x) == index);

    for (let i = 0; i < temp.length; i++) {
      arr.push(arr1.find((x) => x.ID == temp[i]));
    }

    setProducts(arr);
    setCustomer({
      ID: obj.ID,
      Fname: obj.Fname,
      Lname: obj.Lname,
      City: obj.City,
    });
  }, []);

  return (
    <Edit
      headline="Customer"
      link="/customers"
      secondLink="/products/editProduct/"
      dispatch={["updateCustomer", false, "deleteCustomer"]}
      mainData={customer}
      setData={setCustomer}
      secondData={products}
    />
  );
}
