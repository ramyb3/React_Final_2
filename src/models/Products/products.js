import Comp1 from "./comp1";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Products() {
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();

  const [customers, setCustomers] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [add, setAdd] = useState(false);
  const [id, setId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [all, setAll] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setCustomers(storeData[0][0]);
    setPurchases(storeData[0][2]);
  }, [storeData]);

  useEffect(() => {
    const arr1 = purchases.map((x) => x.CustomerID);
    const arr2 = purchases.map((x) => x.ProductID);
    const temp = arr1.filter((x, index) => arr1.indexOf(x) === index);
    const temp1 = arr2.filter((x, index) => arr2.indexOf(x) === index);
    const obj = [];

    for (let i = 0; i < temp.length; i++) {
      const products = [];

      for (let j = 0; j < temp1.length; j++) {
        const prod = purchases.filter(
          (x) => x.ProductID === temp1[j] && x.CustomerID === temp[i]
        );
        let date = purchases
          .filter((x) => x.ProductID === temp1[j] && x.CustomerID === temp[i])
          .map((x) => x.Date);

        date = date.filter((x, index) => date.indexOf(x) === index);

        if (prod.length !== 0) {
          products.push({ ProductID: prod[0].ProductID, Date: date });
        }
      }

      obj.push({ CustomerID: temp[i], Products: products });
    }

    setAll(obj);

    const arr = storeData[0][2].map((x) => x.ProductID);

    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      count += storeData[0][1].find((x) => x.ID === arr[i]).Price;
    }

    setAmount(count);
  });

  const addProducts = () => {
    dispatch({ type: "addPurchase", payload: [id, list] });
    setAdd(false);
    setList([]);
  };

  return (
    <div className="size">
      <div style={{ float: "left", width: "43%" }}>
        <h2> Products List:</h2>

        <Link to="addProduct">
          <input type="button" value="Add Product" className="button" />
        </Link>
        <br />
        <br />

        {storeData[0][1].map((item, index) => {
          return (
            <div key={index}>
              <div className="border" style={{ width: "85%" }}>
                <b>Product Name: </b> &nbsp;&nbsp;
                <Link to={"editProduct/" + item.ID}>{item.Name}</Link>
                <br />
                <b>Product Price: </b> &nbsp;&nbsp;{item.Price}$<br />
                <b>Product Quantity: </b> &nbsp;&nbsp;{item.Quantity}
                <br />
                <br />
                <Comp1 props={item} />
                {purchases.find((x) => x.ProductID === item.ID) !==
                undefined ? (
                  <>
                    {all.map((x, i) => {
                      return (
                        <div key={i}>
                          {x.Products.find((z) => z.ProductID === item.ID) !==
                          undefined ? (
                            <>
                              <ul>
                                <li>
                                  <Link
                                    to={
                                      "/customers/editCustomer/" + x.CustomerID
                                    }
                                  >
                                    {
                                      customers.find(
                                        (z) => z.ID === x.CustomerID
                                      ).Fname
                                    }{" "}
                                    {
                                      customers.find(
                                        (z) => z.ID === x.CustomerID
                                      ).Lname
                                    }{" "}
                                  </Link>
                                </li>

                                <li>
                                  {x.Products.map((y, j) => {
                                    return (
                                      <div key={j}>
                                        {y.ProductID === item.ID ? (
                                          <>
                                            {y.Date.map((z, k) => {
                                              return <div key={k}>{z}</div>;
                                            })}{" "}
                                          </>
                                        ) : null}
                                      </div>
                                    );
                                  })}
                                </li>
                              </ul>

                              <input
                                type="button"
                                value="Add"
                                onClick={() => (
                                  setAdd(true), setId(x.CustomerID)
                                )}
                                className="button"
                              />
                              <br />
                            </>
                          ) : null}
                        </div>
                      );
                    })}{" "}
                  </>
                ) : null}
              </div>
              <br />
            </div>
          );
        })}
      </div>

      {add === true ? (
        <div style={{ float: "left", width: "30%", textAlign: "left" }}>
          <h3>
            {" "}
            Customer:{" "}
            <u>
              {customers.find((z) => z.ID === id).Fname}{" "}
              {customers.find((z) => z.ID === id).Lname}{" "}
            </u>{" "}
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
        </div>
      ) : null}

      <div className="amount">
        <div className="border" style={{ marginTop: "35px" }}>
          <h3> Total amount of purchases: {amount}$</h3>
        </div>
      </div>
    </div>
  );
}
