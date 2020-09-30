import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useQuery } from 'resolve-react-hooks';
import CustomerOverviewTable from './CustomerOverviewTable';

const CustomerOverview = () => {
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState(null);

  const fetchCustomers = useQuery(
    { name: 'customers', resolver: 'overview' },
    (err, res) => {
      if (err) setError(err.message);
      else setCustomers(res.data || []);
    },
    [setError, setCustomers]
  );

  useEffect(fetchCustomers, [fetchCustomers]);

  return (
    <Container>
      <Row>
        <Col>
          {error ? (
            <Alert variant="danger">{error}</Alert>
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
