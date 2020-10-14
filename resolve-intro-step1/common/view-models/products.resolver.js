// import jwt from 'jsonwebtoken';
// import jwtSecret from '../../auth/jwt_secret';

export default async (resolve, query, three /*{ jwt: token, viewModel }*/) => {
  // try {
  //   jwt.verify(token, jwtSecret)
  // } catch (error) {
  //   throw new Error('Permission denied')
  // }

  const viewModel = three.viewModel;

  console.log('view model resolver');
  console.dir(three);
  console.dir(query);

  const { data, cursor } = await resolve.buildViewModel(viewModel.name, query);

  return {
    data,
    meta: {
      cursor,
      eventTypes: viewModel.eventTypes,
      aggregateIds: query.aggregateIds,
    },
  };
};
