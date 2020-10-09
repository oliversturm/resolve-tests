import React from 'react';
import { render } from 'react-dom';

import App from './containers/App';
import { ResolveContext } from 'resolve-react-hooks';

const entryPoint = (context) => {
  console.log('Starting up, context is', context);
  const appContainer = document.createElement('div');
  document.body.appendChild(appContainer);
  render(
    <ResolveContext.Provider value={context}>
      <App staticPath={context.staticPath} />
    </ResolveContext.Provider>,
    appContainer
  );
};

export default entryPoint;
