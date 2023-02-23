import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

function EditCustomer() {
  const storeData = useSelector((state) => state);

  const dispatch = useDispatch();

  const params = useParams();

  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState({
    ID: 0,
    Fname: "",
    Lname: "",
    City: "",
  });

  useEffect(() => {
    let obj = storeData[0][0].find((x) => x.ID == params.id);

    let arr = storeData[0][2].filter((x) => x.CustomerID == params.id);

    let arr1 = [];

    for (var i = 0; i < arr.length; i++) {
      let check = storeData[0][1].find((x) => x.ID == arr[i].ProductID);

      arr1.push(check);
    }

    arr = [];

    let temp = arr1.map((x) => x.ID);
    temp = temp.filter((x, index) => temp.indexOf(x) == index);

    for (var i = 0; i < temp.length; i++)
      arr.push(arr1.find((x) => x.ID == temp[i]));

    setProducts(arr);
    setCustomer({
      ID: obj.ID,
      Fname: obj.Fname,
      Lname: obj.Lname,
      City: obj.City,
    });
  }, []);

  const send = () => {
    if (customer.Fname == "" || customer.Lname == "" || customer.City == "")
      alert("YOU NEED TO FILL ALL THE FORM!!");
    else dispatch({ type: "updateCustomer", payload: customer });
  };

  return (
    <div>
      <h2>Edit Customer:</h2>

      <div className="left">
        <b>Customer First Name:</b>{" "}
        <input
          className="textWidth"
          type="text"
          value={customer.Fname}
          onChange={(e) => setCustomer({ ...customer, Fname: e.target.value })}
        />
        <br />
        <br />
        <b>Customer Last Name:</b>{" "}
        <input
          className="textWidth"
          type="text"
          value={customer.Lname}
          onChange={(e) => setCustomer({ ...customer, Lname: e.target.value })}
        />
        <br />
        <br />
        <b>Customer City:</b>{" "}
        <input
          className="textWidth"
          type="text"
          value={customer.City}
          onChange={(e) => setCustomer({ ...customer, City: e.target.value })}
        />
        <br />
        <br />
        <Link to="/customers">
          <input
            type="button"
            onClick={send}
            value="Update"
            className="button"
          />
        </Link>
        <Link to="/customers">
          <input
            type="button"
            onClick={() =>
              dispatch({ type: "deleteCustomer", payload: customer.ID })
            }
            value="Delete"
            className="button"
          />
        </Link>
        <br />
        <br />
      </div>

      <div className="right">
        {products.length != 0 ? (
          <div>
            <b>Products that this customer purchased:</b>

            <ul>
              {products.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={"/products/editProduct/" + item.ID}>
                      {item.Name}{" "}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <b>This customer didn't purchased any product!! </b>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditCustomer;
