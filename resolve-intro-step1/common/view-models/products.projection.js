import { PRODUCT_CREATED, PRODUCT_UPDATED } from '../event-types';

export default {
  Init: () => [],

  [PRODUCT_CREATED]: (state, { aggregateId, payload: { name, image } }) => {
    console.log(`created, id is ${aggregateId}`);
    return state.concat({
      id: aggregateId,
      name,
      image,
    });
  },

  [PRODUCT_UPDATED]: (state, { aggregateId, payload: { name, image } }) =>
    state.map((p) =>
      p.id === aggregateId
        ? {
            ...p,
            name,
            image,
          }
        : p
    ),
};
