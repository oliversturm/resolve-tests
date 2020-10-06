export default {
  Init: (store) => {
    store.defineTable('items', { indexes: { id: 'string' }, fields: ['text'] });
  },

  ITEM_CREATED: (store, event) => {
    store.insert('items', { id: event.aggregateId, text: event.payload.text });
  },
};
