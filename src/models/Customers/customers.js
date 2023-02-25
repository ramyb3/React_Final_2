import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Customers(props) {
  const storeData = useSelector((state) => state);

  return (
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
                {storeData[0][2].find(
                  (purchase) => purchase.CustomerID == item.ID
                ) ? (
                  <>
                    {storeData[0][2].map((purchase, i) => {
                      return (
                        <ul style={{ padding: "0" }} key={i}>
                          {purchase.CustomerID == item.ID ? (
                            <li style={{ listStyleType: "none" }}>
                              <Link
                                to={`/products/editProduct/${purchase.ProductID}`}
                              >
                                {
                                  storeData[0][1].find(
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
                {storeData[0][2].find(
                  (purchase) => purchase.CustomerID == item.ID
                ) ? (
                  <>
                    {storeData[0][2].map((purchase, i) => {
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
                    props.setAdd(true);
                    props.setId(item.ID);
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
  );
}
