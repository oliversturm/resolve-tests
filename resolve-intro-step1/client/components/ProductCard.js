import React, { useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProductCardViewBody from './ProductCardViewBody';
import ProductCardEditBody from './ProductCardEditBody';

const ProductCard = ({ product, endAdding }) => {
  const [editingExisting, setEditingExisting] = useState(false);
  const editExisting = useCallback(() => {
    setEditingExisting(true);
  }, [setEditingExisting]);
  const endEditing = useCallback(() => {
    setEditingExisting(false);
    endAdding && endAdding();
  }, [setEditingExisting, endAdding]);

  return (
    <Card style={{ margin: '10px', width: '350px' }}>
      {product && !editingExisting ? (
        <ProductCardViewBody product={product} startEditing={editExisting} />
      ) : (
        <ProductCardEditBody
          editingExisting={editingExisting}
          product={product}
          endEditing={endEditing}
        />
      )}
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  endAdding: PropTypes.func,
};

export default ProductCard;
