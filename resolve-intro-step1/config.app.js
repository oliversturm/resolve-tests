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
      name: 'productsReadModel',
      projection: 'common/read-models/products.projection.js',
      resolvers: 'common/read-models/products.resolvers.js',
      connectorName: 'default',
    },
  ],

  viewModels: [
    {
      name: 'products',
      projection: 'common/view-models/products.projection.js',
      serializeState: 'common/view-models/products.serialize_state.js',
      deserializeState: 'common/view-models/products.deserialize_state.js',
    },
  ],
  clientEntries: ['client/index.js'],
};

export default appConfig;
