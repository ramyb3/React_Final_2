import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Products(props) {
  const storeData = useSelector((state) => state);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
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

    setAllData(obj);

    const arr = storeData[0][2].map((x) => x.ProductID);
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      count += storeData[0][1].find((x) => x.ID == arr[i]).Price;
    }

    props.setAmount(count);
  }, [storeData]);

  return (
    <>
      {storeData[0][1].map((item, index) => {
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
                    <Link to={`editProduct/${item.ID}`}>{item.Name}</Link>
                  }
                />
                <Line text="Price" children={`${item.Price}$`} />
                <Line text="Quantity" children={item.Quantity} />
              </div>

              {storeData[0][2].find(
                (purchase) => purchase.ProductID == item.ID
              ) ? (
                <>
                  <b>Customers that purchased this product:</b>
                  {allData.map((data, index) => {
                    return (
                      <div key={index}>
                        {data.Products.find(
                          (temp) => temp.ProductID == item.ID
                        ) ? (
                          <>
                            <ul style={{ marginTop: "0" }}>
                              <li>
                                <Link
                                  to={`/customers/editCustomer/${data.CustomerID}`}
                                >
                                  {
                                    storeData[0][0].find(
                                      (temp) => temp.ID == data.CustomerID
                                    ).Fname
                                  }{" "}
                                  {
                                    storeData[0][0].find(
                                      (temp) => temp.ID == data.CustomerID
                                    ).Lname
                                  }
                                </Link>
                              </li>
                              <li>
                                {data.Products.map((product, index) => {
                                  return (
                                    <div key={index}>
                                      {product.ProductID == item.ID ? (
                                        <>
                                          {product.Date.map((date, index) => {
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
