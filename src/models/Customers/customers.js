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
              <TableData date={false} data={storeData} id={customer.ID} />
              <TableData date={true} data={storeData} id={customer.ID} />
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

function TableData(props) {
  return (
    <td>
      {props.data.purchases.find(
        (purchase) => purchase.CustomerID == props.id
      ) ? (
        props.data.purchases.map((purchase, i) => {
          return (
            <ul style={{ padding: "0" }} key={i}>
              {purchase.CustomerID == props.id ? (
                <li style={{ listStyleType: "none" }}>
                  {props.date ? (
                    purchase.Date
                  ) : (
                    <Link to={`/products/editProduct/${purchase.ProductID}`}>
                      {
                        props.data.products.find(
                          (product) => product.ID == purchase.ProductID
                        ).Name
                      }
                    </Link>
                  )}
                </li>
              ) : null}
            </ul>
          );
        })
      ) : (
        <>X</>
      )}
    </td>
  );
}
