import { useSaveDispatch } from "../menu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Products() {
  const storeData = useSelector((state) => state);
  const { saveDispatch } = useSaveDispatch();

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

    const arr1 = storeData[0][2].map((x) => x.CustomerID);
    const arr2 = storeData[0][2].map((x) => x.ProductID);
    const temp = arr1.filter((x, index) => arr1.indexOf(x) == index);
    const temp1 = arr2.filter((x, index) => arr2.indexOf(x) == index);
    const obj = [];

    for (let i = 0; i < temp.length; i++) {
      const products = [];

      for (let j = 0; j < temp1.length; j++) {
        const prod = storeData[0][2].filter(
          (x) => x.ProductID == temp1[j] && x.CustomerID == temp[i]
        );
        let date = storeData[0][2]
          .filter((x) => x.ProductID == temp1[j] && x.CustomerID == temp[i])
          .map((x) => x.Date);

        date = date.filter((x, index) => date.indexOf(x) == index);

        if (prod.length != 0) {
          products.push({ ProductID: prod[0].ProductID, Date: date });
        }
      }

      obj.push({ CustomerID: temp[i], Products: products });
    }

    setAll(obj);

    const arr = storeData[0][2].map((x) => x.ProductID);
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      count += storeData[0][1].find((x) => x.ID == arr[i]).Price;
    }

    setAmount(count);
  }, [storeData]);

  const addProducts = () => {
    saveDispatch("addPurchase", [id, list]);
    setAdd(false);
    setList([]);
  };

  return (
    <div
      className="productsPage"
      style={{
        paddingLeft: "2px",
        display: "grid",
        gap: "20px",
      }}
    >
      <div>
        <h2> Products List:</h2>

        <Link to="addProduct">
          <button>Add Product</button>
        </Link>

        {storeData[0][1].map((item, index) => {
          return (
            <div style={{ marginTop: "20px" }} key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "85%",
                  borderStyle: "solid",
                  paddingLeft: "2px",
                  gap: "15px",
                }}
              >
                <div>
                  <div>
                    <b style={{ paddingRight: "8px" }}>Product Name:</b>
                    <Link to={`editProduct/${item.ID}`}>{item.Name}</Link>
                  </div>
                  <div>
                    <b style={{ paddingRight: "8px" }}>Product Price:</b>
                    {item.Price}$
                  </div>
                  <div>
                    <b style={{ paddingRight: "8px" }}>Product Quantity:</b>
                    {item.Quantity}
                  </div>
                </div>
               
                {purchases.find((purchase) => purchase.ProductID == item.ID) ? (
                  <>
                  <b>Customers that purchased this product:</b>
                    {all.map((x, i) => {
                      return (
                        <div key={i}>
                          {x.Products.find((z) => z.ProductID == item.ID) ? (
                            <>
                              <ul style={{marginTop:"0"}}>
                                <li>
                                  <Link
                                    to={`/customers/editCustomer/${x.CustomerID}`}
                                  >
                                    {
                                      customers.find(
                                        (z) => z.ID == x.CustomerID
                                      ).Fname
                                    }{" "}
                                    {
                                      customers.find(
                                        (z) => z.ID == x.CustomerID
                                      ).Lname
                                    }
                                  </Link>
                                </li>
                                <li>
                                  {x.Products.map((y, j) => {
                                    return (
                                      <div key={j}>
                                        {y.ProductID == item.ID ? (
                                          <>
                                            {y.Date.map((z, k) => {
                                              return <div key={k}>{z}</div>;
                                            })}
                                          </>
                                        ) : null}
                                      </div>
                                    );
                                  })}
                                </li>
                              </ul>

                              <button
                                style={{marginBottom:"2px"}}
                                onClick={() => {
                                  setAdd(true);
                                  setId(x.CustomerID);
                                }}
                              >
                                Add
                              </button>
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </>
                ) : <b>There isn't any Customer that purchased this product!!</b>}
              </div>
            </div>
          );
        })}
      </div>

      {add ? (
        <div>
          <h3>
            Customer:{" "}
            <u>
              {customers.find((data) => data.ID == id).Fname}{" "}
              {customers.find((data) => data.ID == id).Lname}
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
          <br />

          <button style={{ marginTop: "15px" }} onClick={addProducts}>
            Buy
          </button>
          <br />
        </div>
      ) : (
        <div />
      )}

      <h3>Total amount of purchases: {amount}$</h3>
    </div>
  );
}
