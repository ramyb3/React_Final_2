import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Customers() {
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();

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
    dispatch({ type: "addPurchase", payload: [id, list] });

    setAdd(false);
    setList([]);
  };

  return (
    <div>
      <div className="customers">
        <h2> Customers Table:</h2>

        <Link to="addCustomer">
          <input type="button" value="Add Customer" className="button" />
        </Link>
        <br />
        <br />

        <table border="1" style={{ width: "80%", textAlign: "center" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Purchased Products</th>
              <th>Purchased Date</th>
              <th> Buy</th>
            </tr>
          </thead>

          {storeData[0][0].map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>
                    <Link to={"editCustomer/" + item.ID}>
                      {item.Fname} {item.Lname}{" "}
                    </Link>{" "}
                  </td>

                  <td>
                    {purchases.find((z) => z.CustomerID === item.ID) !==
                    undefined ? (
                      <>
                        {purchases.map((x, i) => {
                          return (
                            <ul>
                              {" "}
                              {x.CustomerID === item.ID ? (
                                <li key={i}>
                                  <Link
                                    to={"/products/editProduct/" + x.ProductID}
                                  >
                                    {
                                      products.find((z) => z.ID === x.ProductID)
                                        .Name
                                    }{" "}
                                  </Link>
                                </li>
                              ) : null}{" "}
                            </ul>
                          );
                        })}
                      </>
                    ) : (
                      <>X</>
                    )}
                  </td>

                  <td>
                    {purchases.find((z) => z.CustomerID === item.ID) !==
                    undefined ? (
                      <>
                        {purchases.map((x, i) => {
                          return (
                            <ul>
                              {" "}
                              {x.CustomerID === item.ID ? (
                                <li key={i}>{x.Date} </li>
                              ) : null}{" "}
                            </ul>
                          );
                        })}
                      </>
                    ) : (
                      <>X</>
                    )}
                  </td>

                  <td>
                    <input
                      type="button"
                      onClick={() => (setAdd(true), setId(item.ID))}
                      value="Buy Products"
                      className="button"
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>

      {add === true ? (
        <div className="buy">
          <h3>
            {" "}
            Customer:{" "}
            <u>
              {storeData[0][0].find((z) => z.ID === id).Fname}{" "}
              {storeData[0][0].find((z) => z.ID === id).Lname}
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

          <input
            type="button"
            value="Buy"
            onClick={addProducts}
            className="button"
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
}
