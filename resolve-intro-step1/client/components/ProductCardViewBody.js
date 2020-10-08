import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

const ProductCardViewBody = ({ product, startEditing }) => {
  return (
    <>
      {product.image && <Card.Img variant="top" src={product.image} />}
      <Card.Body className="mt-auto flex-grow-0">
        <Card.Title>{product.name}</Card.Title>
        <Button variant="primary" onClick={startEditing}>
          <Pencil />
          &nbsp;Edit
        </Button>
      </Card.Body>
    </>
  );
};

ProductCardViewBody.propTypes = {
  product: PropTypes.object,
  startEditing: PropTypes.func,
};

export default ProductCardViewBody;
