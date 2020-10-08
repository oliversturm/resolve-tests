import { PRODUCT_CREATED, PRODUCT_UPDATED } from '../event-types';

export default {
  Init: async (store) => {
    await store.defineTable('products', {
      indexes: { id: 'string' },
      fields: ['name', 'image'],
    });
  },

  [PRODUCT_CREATED]: async (
    store,
    { aggregateId, payload: { name, image } }
  ) => {
    await store.insert('products', {
      id: aggregateId,
      name,
      image: image || '',
    });
  },

  [PRODUCT_UPDATED]: async (
    store,
    { aggregateId, payload: { name, image } }
  ) => {
    await store.update(
      'products',
      { id: aggregateId },
      { $set: { name, image: image || '' } }
    );
  },
};
