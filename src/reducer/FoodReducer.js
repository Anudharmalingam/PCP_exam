const FoodReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload,
        filteredOrders: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default FoodReducer;
