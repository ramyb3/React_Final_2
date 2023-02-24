import { useSaveDispatch } from "../menu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Customers() {
  const storeData = useSelector((state) => state);
  const { saveDispatch } = useSaveDispatch();

  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [add, setAdd] = useState(false);
  const [id, setId] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    setProducts(storeData[0][1]);
    setPurchases(storeData[0][2]);
  }, [storeData]);

  const addProducts = () => {
    saveDispatch("addPurchase", [id, list]);
    setAdd(false);
    setList([]);
  };

  return (
    <div
      className="mainPage"
      style={{
        paddingLeft: "2px",
        display: "grid",
        gap: "20px",
      }}
    >
      <div>
        <h2>Customers Table:</h2>

        <Link to="addCustomer">
          <button>Add Customer</button>
        </Link>

        <table
          border="1"
          style={{ width: "80%", textAlign: "center", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Purchased Products</th>
              <th>Purchased Date</th>
              <th>Buy</th>
            </tr>
          </thead>

          {storeData[0][0].map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>
                    <Link to={`editCustomer/${item.ID}`}>
                      {item.Fname} {item.Lname}
                    </Link>
                  </td>
                  <td>
                    {purchases.find(
                      (purchase) => purchase.CustomerID == item.ID
                    ) ? (
                      <>
                        {purchases.map((purchase, i) => {
                          return (
                            <ul style={{ padding: "0" }} key={i}>
                              {purchase.CustomerID == item.ID ? (
                                <li style={{ listStyleType: "none" }}>
                                  <Link
                                    to={`/products/editProduct/${purchase.ProductID}`}
                                  >
                                    {
                                      products.find(
                                        (product) =>
                                          product.ID == purchase.ProductID
                                      ).Name
                                    }
                                  </Link>
                                </li>
                              ) : null}
                            </ul>
                          );
                        })}
                      </>
                    ) : (
                      <>X</>
                    )}
                  </td>
                  <td>
                    {purchases.find(
                      (purchase) => purchase.CustomerID == item.ID
                    ) ? (
                      <>
                        {purchases.map((purchase, i) => {
                          return (
                            <ul style={{ padding: "0" }} key={i}>
                              {purchase.CustomerID == item.ID ? (
                                <li style={{ listStyleType: "none" }}>
                                  {purchase.Date}
                                </li>
                              ) : null}
                            </ul>
                          );
                        })}
                      </>
                    ) : (
                      <>X</>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setAdd(true);
                        setId(item.ID);
                      }}
                    >
                      Buy Products
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
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

          {products.map((item, index) => {
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
      ) : null}
    </div>
  );
}
