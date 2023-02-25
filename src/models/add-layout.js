import { Buttons } from "./menu";

export default function Add(props) {
  return (
    <div className="flex" style={{ alignItems: "center" }}>
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

      <Buttons
        comp={true}
        link={props.link}
        dispatch={props.dispatch}
        data={props.data}
      />
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
