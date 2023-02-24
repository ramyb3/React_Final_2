import { useSaveDispatch } from "./menu";
import { Link } from "react-router-dom";

export default function Edit(props) {
  const { saveForm, saveDispatch } = useSaveDispatch();

  return (
    <>
      <h2>Edit {props.headline}:</h2>
      <div
        className="mainPage"
        style={{
          paddingLeft: "2px",
          display: "grid",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "15px",
          }}
        >
          {props.dispatch[1] ? (
            <>
              <Input
                text="Product Name: "
                value={props.mainData.Name}
                onChange={(e) =>
                  props.setData({ ...props.mainData, Name: e.target.value })
                }
              />
              <Input
                text="Product Price: "
                min="1"
                type="number"
                value={props.mainData.Price}
                onChange={(e) =>
                  props.setData({
                    ...props.mainData,
                    Price: parseInt(e.target.value),
                  })
                }
              />
              <Input
                text="Product Quantity: "
                min="1"
                type="number"
                value={props.mainData.Quantity}
                onChange={(e) =>
                  props.setData({
                    ...props.mainData,
                    Quantity: parseInt(e.target.value),
                  })
                }
              />
            </>
          ) : (
            <>
              <Input
                text="Customer First Name: "
                value={props.mainData.Fname}
                onChange={(e) =>
                  props.setData({ ...props.mainData, Fname: e.target.value })
                }
              />
              <Input
                text="Customer Last Name: "
                value={props.mainData.Lname}
                onChange={(e) =>
                  props.setData({ ...props.mainData, Lname: e.target.value })
                }
              />
              <Input
                text="Customer City: "
                value={props.mainData.City}
                onChange={(e) =>
                  props.setData({ ...props.mainData, City: e.target.value })
                }
              />
            </>
          )}

          <div style={{ display: "flex", gap: "5px" }}>
            <Link to={props.link}>
              <button
                onClick={() =>
                  saveForm(props.dispatch[0], props.mainData, props.dispatch[1])
                }
              >
                Update
              </button>
            </Link>
            <Link to={props.link}>
              <button
                onClick={() =>
                  saveDispatch(props.dispatch[2], props.mainData.ID)
                }
              >
                Delete
              </button>
            </Link>
          </div>
        </div>

        <div>
          {props.secondData.length > 0 ? (
            <>
              <b>
                {props.dispatch[1]
                  ? "Customers that purchased this product"
                  : "Products that this customer purchased"}
                :
              </b>
              <ul>
                {props.secondData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={`${props.secondLink}${item.ID}`}>
                        {props.dispatch[1]
                          ? `${item.Fname} ${item.Lname}`
                          : item.Name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <b>
              {props.dispatch[1]
                ? "There isn't any Customer that purchased this"
                : "This customer didn't purchased any"}{" "}
              product!!
            </b>
          )}
        </div>
      </div>
    </>
  );
}

function Input(props) {
  return (
    <div>
      <b>{props.text}</b>
      <input
        value={props.value}
        onChange={props.onChange}
        type={props.type || "text"}
        min={props.min}
      />
    </div>
  );
}
