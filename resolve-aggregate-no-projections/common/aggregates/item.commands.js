export default {
  createItem: (agg, cmd) => {
    return { type: 'ITEM_CREATED', payload: { text: cmd.payload.text } };
  },
};
