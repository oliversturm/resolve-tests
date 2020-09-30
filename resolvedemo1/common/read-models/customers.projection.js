import { CUSTOMER_CONFIRMED, CUSTOMER_CREATED } from '../event-types';

export default {
  Init: async (store) => {
    await store.defineTable('customerOverview', {
      indexes: {
        id: 'string',
      },
      fields: ['createdTimestamp', 'lastChangedTimestamp', 'name', 'confirmed'],
    });

    await store.defineTable('customersForEditing', {
      indexes: {
        id: 'string',
      },
      fields: ['name', 'location'],
    });
  },

  [CUSTOMER_CREATED]: async (
    store,
    { aggregateId, timestamp, payload: { name, location } }
  ) => {
    await store.insert('customerOverview', {
      id: aggregateId,
      createdTimestamp: timestamp,
      //lastChangedTimestamp: 0,
      name,
      confirmed: false,
    });

    await store.insert('customersForEditing', {
      id: aggregateId,
      name,
      location: location || '',
    });
  },

  [CUSTOMER_CONFIRMED]: async (store, { aggregateId, timestamp }) => {
    await store.update(
      'customerOverview',
      { id: aggregateId },
      { $set: { confirmed: true, lastChangedTimestamp: timestamp } }
    );
  },
};
