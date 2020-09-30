import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'resolve-redux';
import { Provider as ReduxProvider } from 'react-redux';
import { ResolveContext } from 'resolve-react-hooks';

import App from './containers/App';
import getRedux from './get-redux';

const entryPoint = (context) => {
  const store = createStore({
    ...context,
    redux: getRedux(),
    isClient: true,
  });

  let appContainer = document.getElementById('app-container');
  if (!appContainer) {
    appContainer = document.createElement('div');
    document.body.appendChild(appContainer);
  }

  render(
    <ReduxProvider store={store}>
      <ResolveContext.Provider value={context}>
        <App staticPath={context.staticPath} />
      </ResolveContext.Provider>
    </ReduxProvider>,
    appContainer
  );
};

export default entryPoint;
