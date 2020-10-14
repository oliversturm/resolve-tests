import { CUSTOMER_CREATED } from '../event-types';

export default {
  [CUSTOMER_CREATED]: (
    state,
    { aggregateId: id, payload: { name, location } }
  ) => ({ ...state, id, name, location }),
};
