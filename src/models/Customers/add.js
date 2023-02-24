import Add from "../add-layout";
import { useState } from "react";

export default function AddProduct() {
  const [customer, setCustomer] = useState({
    ID: 0,
    Fname: "",
    Lname: "",
    City: "",
  });

  return (
    <Add
      headline="Customer"
      link="/customers"
      dispatch={["addCustomer", false]}
      data={customer}
      setData={setCustomer}
    />
  );
}
