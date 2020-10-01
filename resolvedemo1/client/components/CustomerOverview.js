import React, { useEffect } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useReduxReadModel } from 'resolve-redux';
import CustomerOverviewTable from './CustomerOverviewTable';

const CustomerOverview = () => {
  const {
    request: fetchCustomers,
    selector: customerOverviewSelector,
  } = useReduxReadModel(
    {
      name: 'customers',
      resolver: 'overview',
      args: {},
    },
    null,
    // tried to catch an error using this delegate, when giving
    // an invalid read model name above - but the delegate wasn't
    // called
    // {
    //   failure: (_, err) => {
    //     console.log(`Err: ${JSON.stringify(err)}`);
    //   },
    // },
    []
  );

  // should be possible (or even cleaner) to pass
  // [fetchCustomers] here for the dependencies, but somehow
  // this gives me and endless loop - bug?
  useEffect(fetchCustomers, []);

  const { status, data: customers } = useSelector(customerOverviewSelector);

  return (
    <Container>
      <Row>
        <Col>
          {/* <Alert>{JSON.stringify(status)}</Alert> */}
          {
            /* {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : */
            customers && customers.length ? (
              <CustomerOverviewTable customers={customers} />
            ) : customers ? (
              <Alert>No customers found</Alert>
            ) : (
              <Spinner animation="border" variant="primary" />
            )
          }
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(CustomerOverview);
