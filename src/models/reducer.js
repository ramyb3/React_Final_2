function reducer(state = {}, action) {
  switch (action.type) {
    case "LOAD": {
      return action.payload;
    }
    case "addProduct": {
      const id = Math.max(...state.products.map((product) => product.ID));
      action.payload.ID = id + 1;
      state.products.push(action.payload);

      return state;
    }
    case "updateProduct": {
      state.products = state.products.filter(
        (product) => product.ID != action.payload.ID
      );
      state.products.push(action.payload);

      return state;
    }
    case "deleteProduct": {
      state.products = state.products.filter(
        (product) => product.ID != action.payload
      );
      state.purchases = state.purchases.filter(
        (purchase) => purchase.ProductID != action.payload
      ); // all purchases not this product

      return state;
    }
    case "addCustomer": {
      const id = Math.max(...state.customers.map((customer) => customer.ID));
      action.payload.ID = id + 1;
      state.customers.push(action.payload);

      return state;
    }
    case "updateCustomer": {
      state.customers = state.customers.filter(
        (customer) => customer.ID != action.payload.ID
      );
      state.customers.push(action.payload);

      return state;
    }
    case "deleteCustomer": {
      state.customers = state.customers.filter(
        (customer) => customer.ID != action.payload
      );
      state.purchases = state.purchases.filter(
        (purchase) => purchase.CustomerID != action.payload
      ); // all purchases not this customer

      return state;
    }
    case "addPurchase": {
      const purchases = state.purchases;
      let date = new Date(Date.now());
      date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      for (let i = 0; i < action.payload[1].length; i++) {
        const obj = {
          ID:
            1 + (purchases.length > 0 ? purchases[purchases.length - 1].ID : 0),
          CustomerID: action.payload[0],
          ProductID: action.payload[1][i],
          Date: date,
        };

        purchases.push(obj);
      }

      return { ...state, purchases };
    }

    default:
      return state;
  }
}

export default reducer;
