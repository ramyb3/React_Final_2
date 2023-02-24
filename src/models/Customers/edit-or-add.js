import Add from "../add-layout";
import Edit from "../edit-layout";
import { useState } from "react";

export default function EditOrAddCustomer(props) {
  const [customer, setCustomer] = useState({
    ID: 0,
    Fname: "",
    Lname: "",
    City: "",
  });

  return (
    <>
      {props.edit ? (
        <Edit
          headline="Customer"
          link="/customers"
          secondLink="/products/editProduct/"
          dispatch={["updateCustomer", false, "deleteCustomer"]}
          data={customer}
          setData={setCustomer}
        />
      ) : (
        <Add
          headline="Customer"
          link="/customers"
          dispatch={["addCustomer", false]}
          data={customer}
          setData={setCustomer}
        />
      )}
    </>
  );
}
