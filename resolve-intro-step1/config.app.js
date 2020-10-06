const appConfig = {
  aggregates: [
    {
      name: 'product',
      commands: 'common/aggregates/product.commands.js',
      projection: 'common/aggregates/product.projection.js',
    },
  ],
  readModels: [
    {
      name: 'products',
      projection: 'common/read-models/products.projection.js',
      resolvers: 'common/read-models/products.resolvers.js',
      connectorName: 'default',
    },
  ],

  // viewModels: [
  //   {
  //     name: 'view-model-name',
  //     projection: 'common/view-models/view-model-name.projection.js',
  //     serializeState: 'common/view-models/view-model-name.serialize_state.js',
  //     deserializeState:
  //       'common/view-models/view-model-name.deserialize_state.js',
  //   },
  // ],
  clientEntries: ['client/index.js'],
};

export default appConfig;
