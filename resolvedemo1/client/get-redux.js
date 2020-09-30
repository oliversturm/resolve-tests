import optimisticCustomers from './reducers/optimistic-customers';
import { devToolsEnhancer } from 'redux-devtools-extension';

const getRedux = () => ({
  reducers: { optimisticCustomers },
  enhancers: [devToolsEnhancer()],
});

export default getRedux;
