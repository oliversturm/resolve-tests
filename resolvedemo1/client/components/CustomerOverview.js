import React, { useEffect } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useReduxReadModel } from 'resolve-redux';
import CustomerOverviewTable from './CustomerOverviewTable';
import {
  CUSTOMER_LIST_FETCHED,
  CUSTOMER_LIST_FETCH_ERROR,
} from '../actions/optimistic-customers';

const CustomerOverview = () => {
  const { request: fetchCustomers } = useReduxReadModel(
    {
      name: 'customers',
      resolver: 'overview',
      args: {},
    },
    null,
    {
      actions: {
        success: (_, res) => ({
          type: CUSTOMER_LIST_FETCHED,
          payload: { data: res.data },
        }),
        failure: (_, err) => ({
          type: CUSTOMER_LIST_FETCH_ERROR,
          payload: { error: err },
        }),
      },
    },
    []
  );

  // Should be possible (or even cleaner) to pass
  // [fetchCustomers] here for the dependencies, but somehow
  // this gives me and endless loop - bug?
  // Note: when I try this in the sample without optimistic actions,
  // the effect in the browser is really bad - it basically crashes.
  // When I try this in this demo *with* optimistic actions,
  // the data is simply loaded again and again, but the browser
  // does not crash.
  useEffect(fetchCustomers, []);

  const { data: customers, error } = useSelector(
    (state) => state.optimisticCustomers
  );

  return (
    <Container>
      <Row>
        <Col>
          {error ? (
            <Alert variant="danger">{error.message}</Alert>
          ) : customers && customers.length ? (
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
