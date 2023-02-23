function reducer(state = [], action) {
  switch (action.type) {
    case "LOAD":
      return [...state, action.payload];

    case "addProduct": {
      let id = Math.max(...state[0][1].map((x) => x.ID));

      action.payload.ID = id + 1;

      state[0][1].push(action.payload);

      return [[state[0][0], state[0][1], state[0][2]]];
    }

    case "updateProduct": {
      let arr = state[0][1].filter((x) => x.ID != action.payload.ID);

      arr.push(action.payload);

      return [[state[0][0], arr, state[0][2]]];
    }

    case "deleteProduct": {
      let arr1 = state[0][1].filter((x) => x.ID != action.payload);
      let arr2 = state[0][2].filter((x) => x.ProductID != action.payload); // all purchases not this product

      return [[state[0][0], arr1, arr2]];
    }

    case "addCustomer": {
      let id = Math.max(...state[0][0].map((x) => x.ID));

      action.payload.ID = id + 1;

      state[0][0].push(action.payload);

      return [[state[0][0], state[0][1], state[0][2]]];
    }

    case "updateCustomer": {
      let arr = state[0][0].filter((x) => x.ID != action.payload.ID);

      arr.push(action.payload);

      return [[arr, state[0][1], state[0][2]]];
    }

    case "deleteCustomer": {
      let arr1 = state[0][0].filter((x) => x.ID != action.payload);
      let arr2 = state[0][2].filter((x) => x.CustomerID != action.payload); // all purchases not this customer

      return [[arr1, state[0][1], arr2]];
    }

    case "addPurchase": {
      let date = new Date(Date.now());

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      date = day + "/" + month + "/" + year;

      let arr = state[0][2],
        temp;

      for (var i = 0; i < action.payload[1].length; i++) {
        if (arr.length > 0)
          temp = {
            ID: arr[arr.length - 1].ID + 1,
            CustomerID: action.payload[0],
            ProductID: action.payload[1][i],
            Date: date,
          };
        else
          temp = {
            ID: 1,
            CustomerID: action.payload[0],
            ProductID: action.payload[1][i],
            Date: date,
          };

        arr.push(temp);
      }

      return [[state[0][0], state[0][1], arr]];
    }

    default:
      return state;
  }
}

export default reducer;
