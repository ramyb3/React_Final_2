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
    <>
      <div className="customers">
        <h2>Customers Table:</h2>

        <Link to="addCustomer">
          <button>Add Customer</button>
        </Link>
        <br />
        <br />

        <table border="1" style={{ width: "80%", textAlign: "center" }}>
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
                    ) != undefined ? (
                      <>
                        {purchases.map((purchase, i) => {
                          return (
                            <ul key={i}>
                              {purchase.CustomerID == item.ID ? (
                                <li>
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
                    ) != undefined ? (
                      <>
                        {purchases.map((purchase, i) => {
                          return (
                            <ul key={i}>
                              {purchase.CustomerID == item.ID ? (
                                <li>{purchase.Date}</li>
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

      {add == true ? (
        <div className="buy">
          <h3>
            Customer:{" "}
            <u>
              {storeData[0][0].find((z) => z.ID == id).Fname}{" "}
              {storeData[0][0].find((z) => z.ID == id).Lname}
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
                <br />
              </div>
            );
          })}
          <br />

          <button onClick={addProducts}>Buy</button>
          <br />
          <br />
        </div>
      ) : null}
    </>
  );
}
