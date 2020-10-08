import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';

const ProductList = ({ products }) => {
  const [addingProduct, setAddingProduct] = useState(false);
  const addProduct = useCallback(() => {
    setAddingProduct(true);
  }, [setAddingProduct]);
  const endAdding = useCallback(() => {
    setAddingProduct(false);
  }, [setAddingProduct]);

  return (
    <>
      {!addingProduct && (
        <Button variant="primary" onClick={addProduct}>
          <Plus />
          &nbsp;Add Product
        </Button>
      )}
      <div className="d-flex flex-row flex-wrap">
        {addingProduct && <ProductCard endAdding={endAdding} />}
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
