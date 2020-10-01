import { devToolsEnhancer } from 'redux-devtools-extension';

const getRedux = () => ({
  reducers: {},
  enhancers: [devToolsEnhancer()],
});

export default getRedux;
