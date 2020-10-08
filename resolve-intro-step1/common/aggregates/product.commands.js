import { PRODUCT_CREATED, PRODUCT_UPDATED } from '../event-types';

export default {
  createProduct: (aggregate, { aggregateId, payload: { name, image } }) => {
    // Make sure the aggregate is new, in other words an aggregate of this
    // type with the same ID doesn't exist yet.
    if (aggregate.exists) throw new Error(`Product(${aggregateId}) exists`);

    // Check other basic validity criteria
    if (!name) throw new Error('Missing field "name"');

    // Return an event structure to represent the command
    return { type: PRODUCT_CREATED, payload: { name, image } };
  },

  updateProduct: (aggregate, { aggregateId, payload: { name, image } }) => {
    if (!aggregate.exists)
      throw new Error(`Product(${aggregateId}) doesn't exist`);

    if (!name) throw new Error('Missing field "name"');

    return { type: PRODUCT_UPDATED, payload: { name, image } };
  },
};
