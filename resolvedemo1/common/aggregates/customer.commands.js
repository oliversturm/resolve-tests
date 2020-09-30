import { CUSTOMER_CONFIRMED, CUSTOMER_CREATED } from '../event-types';

export default {
  createCustomer: (customer, { payload: { name, location } }) => {
    if (Object.keys(customer).length > 0)
      throw new Error('Customer exists already');

    if (!name) throw new Error('Name is required');

    return { type: CUSTOMER_CREATED, payload: { name, location } };
  },

  confirmCustomer: (customer) => {
    if (Object.keys(customer).length === 0) throw new Error('Unknown customer');

    if (customer.confirmed) throw new Error('Customer is already confirmed');

    return { type: CUSTOMER_CONFIRMED };
  },
};
