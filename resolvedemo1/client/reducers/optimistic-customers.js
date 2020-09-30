import {
  CUSTOMER_CONFIRMED,
  CUSTOMER_LIST_FETCHED,
} from '../actions/optimistic-customers';

const optimisticCustomers = (state = [], action) => {
  switch (action.type) {
    case CUSTOMER_CONFIRMED:
      return state.map((c) =>
        c.id === action.payload.id ? { ...c, confirmed: true } : c
      );

    // case CUSTOMER_LIST_FETCHED: {
    //   return action.payload.data
    // }
    default:
      return state;
  }
};

export default optimisticCustomers;
