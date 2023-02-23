import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Menu() {
  const dispatch = useDispatch();

  useEffect(() => {
    const customers = [
      { ID: 1, Fname: "abc", Lname: "def", City: "Ramla" },
      { ID: 2, Fname: "ghi", Lname: "jkl", City: "TLV" },
    ];
    const products = [
      { ID: 1, Name: "PC", Price: 2000, Quantity: 1 },
      { ID: 2, Name: "TV", Price: 1000, Quantity: 1 },
    ];

    dispatch({ type: "LOAD", payload: [customers, products, []] });
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Link to="products">
          <button style={{ height: "30px", fontSize: "15px" }}>Products</button>
        </Link>
        &nbsp;
        <Link to="customers">
          <button style={{ height: "30px", fontSize: "15px" }}>
            Customers
          </button>
        </Link>
      </div>

      <Outlet />
    </>
  );
}
