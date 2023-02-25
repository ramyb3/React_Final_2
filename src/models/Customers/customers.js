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

      {storeData.customers.map((customer, index) => {
        return (
          <tbody key={index}>
            <tr>
              <td>
                <Link to={`editCustomer/${customer.ID}`}>
                  {customer.Fname} {customer.Lname}
                </Link>
              </td>
              <td>
                {storeData.purchases.find(
                  (purchase) => purchase.CustomerID == customer.ID
                ) ? (
                  <>
                    {storeData.purchases.map((purchase, i) => {
                      return (
                        <ul style={{ padding: "0" }} key={i}>
                          {purchase.CustomerID == customer.ID ? (
                            <li style={{ listStyleType: "none" }}>
                              <Link
                                to={`/products/editProduct/${purchase.ProductID}`}
                              >
                                {
                                  storeData.products.find(
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
                {storeData.purchases.find(
                  (purchase) => purchase.CustomerID == customer.ID
                ) ? (
                  <>
                    {storeData.purchases.map((purchase, i) => {
                      return (
                        <ul style={{ padding: "0" }} key={i}>
                          {purchase.CustomerID == customer.ID ? (
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
                    props.setId(customer.ID);
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
