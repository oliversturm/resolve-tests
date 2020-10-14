const appConfig = {
  aggregates: [
    {
      name: 'customer',
      commands: 'common/aggregates/customer.commands.js',
      projection: 'common/aggregates/customer.projection.js',
    },
  ],
  readModels: [
    {
      name: 'customers',
      projection: 'common/read-models/customers.projection.js',
      resolvers: 'common/read-models/customers.resolvers.js',
      connectorName: 'default',
    },
  ],
  viewModels: [
    {
      name: 'customersView',
      projection: 'common/view-models/customersView.projection.js',
      serializeState: 'common/view-models/customersView.serialize_state.js',
      deserializeState: 'common/view-models/customersView.deserialize_state.js',
      resolver: 'common/view-models/customersView.resolver.js',
    },
  ],
  apiHandlers: [
    {
      path: '/api/$ttr',
      handler: 'common/api-handlers/ttr.js',
      method: 'POST',
    },
  ],
  clientEntries: ['client/index.js'],
};

export default appConfig;
