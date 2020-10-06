import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const App = ({ staticPath }) => {
  const stylesheetLink = {
    rel: 'stylesheet',
    type: 'text/css',
    href: `${staticPath}/bootstrap.min.css`,
  };
  const faviconLink = {
    rel: 'icon',
    type: 'image/png',
    href: `${staticPath}/favicon.ico`,
  };
  const links = [stylesheetLink, faviconLink];
  const meta = {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
  };

  return (
    <div>
      <div>
        <Helmet title="reSolve Introduction" link={links} meta={[meta]} />
      </div>
      <h1 align="center">reSolve Introduction</h1>
    </div>
  );
};

App.propTypes = {
  staticPath: PropTypes.string,
};

export default App;
