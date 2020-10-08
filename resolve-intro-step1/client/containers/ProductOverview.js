import React, { useState, useEffect } from 'react';
import { useQuery } from 'resolve-react-hooks';
import { Alert, Spinner } from 'react-bootstrap';
import ProductList from '../components/ProductList';

const ProductOverview = () => {
  // Local state: list of products, and error placeholder
  const [error, setError] = useState();
  const [products, setProducts] = useState();

  // useQuery creates the helper that contacts the read model
  // and retrieves the data
  const fetchProducts = useQuery(
    { name: 'products', resolver: 'all' },
    (err, res) => {
      // Data is here now - if nothing went wrong
      if (err) setError(err.message);
      else setProducts(res.data);
    },
    [setError, setProducts]
  );

  // Run the data retrieval helper at least once
  useEffect(fetchProducts, [fetchProducts]);

  // Render the component depending on the data loading state
  if (error) return <Alert variant="danger">{error}</Alert>;
  else if (products) {
    return <ProductList products={products} />;
  } else
    return (
      <Spinner
        style={{ display: 'block', margin: '50px auto' }}
        animation="border"
        variant="primary"
      />
    );
};

export default ProductOverview;
