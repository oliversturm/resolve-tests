const appConfig = {
  aggregates: [
    {
      name: 'person',
      commands: 'common/aggregates/person.commands.js',
      projection: 'common/aggregates/person.projection.js',
    },
  ],
  readModels: [
    {
      name: 'people',
      projection: 'common/read-models/people.projection.js',
      resolvers: 'common/read-models/people.resolvers.js',
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
