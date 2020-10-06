const appConfig = {
  aggregates: [
    {
      name: 'item',
      commands: 'common/aggregates/item.commands.js',
      projection: 'common/aggregates/item.projection.js',
    },
  ],
  readModels: [
    {
      name: 'items',
      projection: 'common/read-models/items.projection.js',
      resolvers: 'common/read-models/items.resolvers.js',
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
};

export default appConfig;
