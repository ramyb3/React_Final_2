function reducer(state = [], action) {
  switch (action.type) {
    case "LOAD":{
      return [...state, action.payload];
    }
    case "addProduct": {
      const id = Math.max(...state[0][1].map((x) => x.ID));
      action.payload.ID = id + 1;
      state[0][1].push(action.payload);

      return [[state[0][0], state[0][1], state[0][2]]];
    }
    case "updateProduct": {
      const arr = state[0][1].filter((x) => x.ID != action.payload.ID);
      arr.push(action.payload);

      return [[state[0][0], arr, state[0][2]]];
    }
    case "deleteProduct": {
      const arr1 = state[0][1].filter((x) => x.ID != action.payload);
      const arr2 = state[0][2].filter((x) => x.ProductID != action.payload); // all purchases not this product

      return [[state[0][0], arr1, arr2]];
    }
    case "addCustomer": {
      const id = Math.max(...state[0][0].map((x) => x.ID));
      action.payload.ID = id + 1;
      state[0][0].push(action.payload);

      return [[state[0][0], state[0][1], state[0][2]]];
    }
    case "updateCustomer": {
      const arr = state[0][0].filter((x) => x.ID != action.payload.ID);
      arr.push(action.payload);

      return [[arr, state[0][1], state[0][2]]];
    }
    case "deleteCustomer": {
      const arr1 = state[0][0].filter((x) => x.ID != action.payload);
      const arr2 = state[0][2].filter((x) => x.CustomerID != action.payload); // all purchases not this customer

      return [[arr1, state[0][1], arr2]];
    }
    case "addPurchase": {
      let date = new Date(Date.now());

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      date = day + "/" + month + "/" + year;

      const arr = state[0][2];
      let temp;

      for (let i = 0; i < action.payload[1].length; i++) {
        if (arr.length > 0) {
          temp = {
            ID: arr[arr.length - 1].ID + 1,
            CustomerID: action.payload[0],
            ProductID: action.payload[1][i],
            Date: date,
          };
        } else {
          temp = {
            ID: 1,
            CustomerID: action.payload[0],
            ProductID: action.payload[1][i],
            Date: date,
          };
        }

        arr.push(temp);
      }

      return [[state[0][0], state[0][1], arr]];
    }

    default:
      return state;
  }
}

export default reducer;
