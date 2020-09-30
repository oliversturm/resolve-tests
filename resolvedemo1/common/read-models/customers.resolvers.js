const overview = async (store) => {
  return await store.find('customerOverview', {}, null, {
    lastChangedTimestamp: -1,
  });
};

const edit = async (store, { id }) => {
  return await store.findOne('customersForEditing', { id });
};

export default { overview, edit };
