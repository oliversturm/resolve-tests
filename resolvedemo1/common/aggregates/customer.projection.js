import { CUSTOMER_CREATED, CUSTOMER_CONFIRMED } from '../event-types';

export default {
  Init: () => ({}),

  [CUSTOMER_CREATED]: (customer /*, {timestamp, payload: {...}} */) => ({
    ...customer,
    confirmed: false,
  }),

  [CUSTOMER_CONFIRMED]: (customer) => ({ ...customer, confirmed: true }),
};
