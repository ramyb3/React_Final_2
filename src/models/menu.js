import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Menu() {
  const { saveDispatch } = useSaveDispatch();

  useEffect(() => {
    const customers = [
      { ID: 1, Fname: "abc", Lname: "def", City: "Ramla" },
      { ID: 2, Fname: "ghi", Lname: "jkl", City: "TLV" },
    ];
    const products = [
      { ID: 1, Name: "PC", Price: 2000, Quantity: 1 },
      { ID: 2, Name: "TV", Price: 1000, Quantity: 1 },
    ];

    saveDispatch("LOAD", { customers, products, purchases: [] });
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Link to="products">
          <button className="main-bt">Products</button>
        </Link>
        <Link to="customers">
          <button className="main-bt">Customers</button>
        </Link>
      </div>

      <Outlet />
    </>
  );
}

export function Buttons(props) {
  const { saveForm, saveDispatch } = useSaveDispatch();

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <Link to={props.link}>
        <button
          onClick={() =>
            saveForm(props.dispatch[0], props.data, props.dispatch[1])
          }
        >
          {props.comp ? "Add" : "Update"}
        </button>
      </Link>
      <Link to={props.link}>
        <button
          onClick={() => {
            if (!props.comp) {
              saveDispatch(props.dispatch[2], props.data.ID);
            }
          }}
        >
          {props.comp ? "Cancel" : "Delete"}
        </button>
      </Link>
    </div>
  );
}

export const useSaveDispatch = () => {
  const dispatch = useDispatch();

  const saveForm = (type, payload, method) => {
    if (
      (method &&
        (isNaN(payload.Price) ||
          isNaN(payload.Quantity) ||
          payload.Name === "")) ||
      (!method &&
        (payload.Fname === "" || payload.Lname === "" || payload.City === ""))
    ) {
      alert("YOU NEED TO FILL ALL FIELDS!!");
    } else {
      saveDispatch(type, payload);
    }
  };

  const saveDispatch = (type, payload) => {
    dispatch({ type, payload });
  };

  return { saveForm, saveDispatch };
};
