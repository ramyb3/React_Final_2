import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Products(props) {
  const storeData = useSelector((state) => state);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    let customers = storeData.purchases.map((purchase) => purchase.CustomerID);
    let products = storeData.purchases.map((purchase) => purchase.ProductID);
    customers = customers.filter(
      (data, index) => customers.indexOf(data) == index
    );
    products = products.filter(
      (data, index) => products.indexOf(data) == index
    );
    let arr = [];

    for (let i = 0; i < customers.length; i++) {
      const productsArr = [];

      for (let j = 0; j < products.length; j++) {
        const purchases = storeData.purchases.filter(
          (purchase) =>
            purchase.ProductID == products[j] &&
            purchase.CustomerID == customers[i]
        );
        let date = storeData.purchases
          .filter(
            (purchase) =>
              purchase.ProductID == products[j] &&
              purchase.CustomerID == customers[i]
          )
          .map((purchase) => purchase.Date);

        date = date.filter((data, index) => date.indexOf(data) == index);

        if (purchases.length != 0) {
          productsArr.push({ ProductID: purchases[0].ProductID, Date: date });
        }
      }

      arr.push({ CustomerID: customers[i], Products: productsArr });
    }

    setAllData(arr);

    arr = storeData.purchases.map((purchase) => purchase.ProductID);
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      count += storeData.products.find((product) => product.ID == arr[i]).Price;
    }

    props.setAmount(count);
  }, [storeData]);

  return (
    <>
      {storeData.products.map((product, index) => {
        return (
          <div style={{ marginTop: "20px" }} key={index}>
            <div
              className="flex"
              style={{
                width: "85%",
                borderStyle: "solid",
                paddingLeft: "2px",
              }}
            >
              <div>
                <Line
                  text="Name"
                  children={
                    <Link to={`editProduct/${product.ID}`}>{product.Name}</Link>
                  }
                />
                <Line text="Price" children={`${product.Price}$`} />
                <Line text="Quantity" children={product.Quantity} />
              </div>

              {storeData.purchases.find(
                (purchase) => purchase.ProductID == product.ID
              ) ? (
                <>
                  <b>Customers that purchased this product:</b>
                  {allData.map((data, index) => {
                    return (
                      <div key={index}>
                        {data.Products.find(
                          (temp) => temp.ProductID == product.ID
                        ) ? (
                          <>
                            <ul style={{ marginTop: "0" }}>
                              <li>
                                <Link
                                  to={`/customers/editCustomer/${data.CustomerID}`}
                                >
                                  {
                                    storeData.customers.find(
                                      (temp) => temp.ID == data.CustomerID
                                    ).Fname
                                  }{" "}
                                  {
                                    storeData.customers.find(
                                      (temp) => temp.ID == data.CustomerID
                                    ).Lname
                                  }
                                </Link>
                              </li>
                              <li>
                                {data.Products.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      {item.ProductID == product.ID ? (
                                        <>
                                          {item.Date.map((date, index) => {
                                            return (
                                              <div key={index}>{date}</div>
                                            );
                                          })}
                                        </>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </li>
                            </ul>

                            <button
                              style={{ marginBottom: "2px" }}
                              onClick={() => {
                                props.setAdd(true);
                                props.setId(data.CustomerID);
                              }}
                            >
                              Buy Products
                            </button>
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </>
              ) : (
                <b>There isn't any customer that purchased this product!!</b>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

function Line(props) {
  return (
    <div>
      <b style={{ paddingRight: "8px" }}>Product {props.text}:</b>
      {props.children}
    </div>
  );
}
