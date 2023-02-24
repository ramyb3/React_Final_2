import { useSaveDispatch } from "../menu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

export default function EditProduct() {
  const storeData = useSelector((state) => state);
  const { saveForm, saveDispatch } = useSaveDispatch();
  const params = useParams();

  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState({
    ID: 0,
    Name: "",
    Price: 0,
    Quantity: 0,
  });

  useEffect(() => {
    const obj = storeData[0][1].find((x) => x.ID == params.id);
    let arr = storeData[0][2].filter((x) => x.ProductID == params.id);
    const arr1 = [];

    for (let i = 0; i < arr.length; i++) {
      const check = storeData[0][0].find((x) => x.ID == arr[i].CustomerID);
      arr1.push(check);
    }

    arr = [];

    let temp = arr1.map((x) => x.ID);
    temp = temp.filter((x, index) => temp.indexOf(x) == index);

    for (let i = 0; i < temp.length; i++) {
      arr.push(arr1.find((x) => x.ID == temp[i]));
    }

    setCustomers(arr);

    setProduct({
      ID: obj.ID,
      Name: obj.Name,
      Price: obj.Price,
      Quantity: obj.Quantity,
    });
  }, []);

  return (
    <>
      <h2>Edit Product:</h2>

      <div className="left">
        <b>Product Name: </b>
        <input
          type="text"
          className="textWidth"
          value={product.Name}
          onChange={(e) => setProduct({ ...product, Name: e.target.value })}
        />
        <br />
        <br />
        <b>Product Price: </b>
        <input
          type="number"
          min="1"
          className="textWidth"
          value={product.Price}
          onChange={(e) =>
            setProduct({ ...product, Price: parseInt(e.target.value) })
          }
        />
        <br />
        <br />
        <b>Product Quantity: </b>
        <input
          type="number"
          min="1"
          className="textWidth"
          value={product.Quantity}
          onChange={(e) =>
            setProduct({ ...product, Quantity: parseInt(e.target.value) })
          }
        />
        <br />
        <br />
        <Link to="/products">
          <button onClick={() => saveForm("updateProduct", product, true)}>
            Update
          </button>
        </Link>
        <Link to="/products">
          <button onClick={() => saveDispatch("deleteProduct", product.ID)}>
            Delete
          </button>
        </Link>
        <br />
        <br />
      </div>

      <div className="right">
        {customers.length != 0 ? (
          <div>
            <b>Customers that purchased this product:</b>
            <ul>
              {customers.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={`/customers/editCustomer/${item.ID}`}>
                      {item.Fname} {item.Lname}
                    </Link>
                    <br />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>
            <b>There isn't any Customer that purchased this product!!</b>
          </div>
        )}
      </div>
    </>
  );
}
