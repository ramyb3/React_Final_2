import { useSaveDispatch } from "./menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Products from "./Products/products";
import Customers from "./Customers/customers";

export default function MainPage(props) {
  const storeData = useSelector((state) => state);
  const { saveDispatch } = useSaveDispatch();

  // const [mainData, setMainData] = useState([]);
  // const [purchases, setPurchases] = useState([]);
  const [add, setAdd] = useState(false);
  const [id, setId] = useState(0);
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   setMainData(storeData[0][props.comp? 0 : 1]);
  //   setPurchases(storeData[0][2]);
  // }, [storeData]);

  const addProducts = () => {
    saveDispatch("addPurchase", [id, list]);
    setAdd(false);
    setList([]);
  };

  return (
    <div
      className={props.comp? "productsPage" : "mainPage"}
      style={{
        paddingLeft: "2px",
        display: "grid",
        gap: "20px",
      }}
    >
      <div>
        <h2>{props.comp? "Products List" : "Customers Table"}:</h2>

        <Link to={`add${props.comp? "Product" : "Customer"}`}>
          <button>Add {props.comp? "Product" : "Customer"}</button>
        </Link>

        {props.comp? <Products /> : <Customers />}
      </div>

      {add ? (
        <div>
          <h3>
            Customer:{" "}
            <u>
              {storeData[0][0].find((data) => data.ID == id).Fname}{" "}
              {storeData[0][0].find((data) => data.ID == id).Lname}
            </u>
          </h3>

          {storeData[0][1].map((item, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  value={item.ID}
                  onChange={(e) => setList([...list, e.target.value])}
                />
                {item.Name}
              </div>
            );
          })}

          <button style={{ marginTop: "15px" }} onClick={addProducts}>
            Buy
          </button>
        </div>
      ) : props.comp? <div/> : null}
    </div>
  );
}
