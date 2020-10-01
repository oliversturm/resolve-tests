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
    // This block was used to test error handling (simply by
    // modifying the read model name above to something invalid) -
    // I can see the error in here, but the browser still reports
    // it as uncaught.
    // {
    //   actions: {
    //     failure: (_, err) => {
    //       console.log('Err:', err);
    //     },
    //   },
    // },
    []
  );

  // Should be possible (or even cleaner) to pass
  // [fetchCustomers] here for the dependencies, but somehow
  // this gives me an endless loop and a hanging browser - bug?
  useEffect(fetchCustomers, []);

  const { status, data: customers } = useSelector(customerOverviewSelector);

  return (
    <Container>
      <Row>
        <Col>
          {/* <Alert>{JSON.stringify(status)}</Alert> */}
          {customers && customers.length ? (
            <CustomerOverviewTable customers={customers} />
          ) : customers ? (
            <Alert>No customers found</Alert>
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(CustomerOverview);
