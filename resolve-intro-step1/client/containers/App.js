import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import ProductOverview from '../components/ProductOverview';

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
      <Container style={{ marginTop: '20px' }}>
        <ProductOverview />
      </Container>
    </div>
  );
};

App.propTypes = {
  staticPath: PropTypes.string,
};

export default App;
