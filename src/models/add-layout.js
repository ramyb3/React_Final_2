import { useSaveDispatch } from "./menu";
import { Link } from "react-router-dom";

export default function Add(props) {
  const { saveForm } = useSaveDispatch();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <h2>Add {props.headline}:</h2>
      {props.dispatch[1] ? (
        <>
          <Input
            placeholder="Name"
            onChange={(e) =>
              props.setData({ ...props.data, Name: e.target.value })
            }
          />
          <Input
            placeholder="Price"
            type="number"
            min="1"
            onChange={(e) =>
              props.setData({ ...props.data, Price: parseInt(e.target.value) })
            }
          />
          <Input
            placeholder="Quantity"
            type="number"
            min="1"
            onChange={(e) =>
              props.setData({
                ...props.data,
                Quantity: parseInt(e.target.value),
              })
            }
          />
        </>
      ) : (
        <>
          <Input
            placeholder="First Name"
            onChange={(e) =>
              props.setData({ ...props.data, Fname: e.target.value })
            }
          />
          <Input
            placeholder="Last Name"
            onChange={(e) =>
              props.setData({ ...props.data, Lname: e.target.value })
            }
          />
          <Input
            placeholder="City"
            onChange={(e) =>
              props.setData({ ...props.data, City: e.target.value })
            }
          />
        </>
      )}
      <div style={{ display: "flex", gap: "5px" }}>
        <Link to={props.link}>
          <button
            onClick={() =>
              saveForm(props.dispatch[0], props.data, props.dispatch[1])
            }
          >
            Add
          </button>
        </Link>
        <Link to={props.link}>
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
}

function Input(props) {
  return (
    <input
      type={props.type || "text"}
      min={props.min}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}
