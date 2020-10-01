import {
  CUSTOMER_LIST_FETCHED,
  CUSTOMER_LIST_FETCH_ERROR,
  CUSTOMER_CONFIRMED,
} from '../actions/optimistic-customers';

const optimisticCustomers = (state = { data: null }, action) => {
  switch (action.type) {
    case CUSTOMER_LIST_FETCHED:
      return { data: action.payload.data };

    case CUSTOMER_LIST_FETCH_ERROR:
      return { data: null, error: action.payload.error };

    case CUSTOMER_CONFIRMED:
      return {
        ...state,
        data: state.data.map((c) =>
          c.id === action.payload.id
            ? { ...c, lastChangedTimestamp: Date.now(), confirmed: true }
            : c
        ),
      };

    default:
      return state;
  }
};

export default optimisticCustomers;
