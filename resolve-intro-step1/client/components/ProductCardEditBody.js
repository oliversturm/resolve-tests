import React, { useCallback, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useCommandBuilder } from 'resolve-react-hooks';
import { v4 as uuid } from 'uuid';

const fileAsData = (file) =>
  file
    ? new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      })
    : Promise.resolve();

const ProductCardEditBody = ({ editingExisting, product, endEditing }) => {
  const [state, setState] = useState({
    name: editingExisting ? product.name : '',
    nameIsInvalid: false,
    image: undefined,
  });

  const productNameChanged = useCallback(
    (e) => {
      setState({ ...state, name: e.target.value });
    },
    [setState, state]
  );

  const productImageChanged = useCallback(
    (e) => {
      setState({
        ...state,
        image: e.target.files[0],
      });
    },
    [setState, state]
  );

  const createProduct = useCommandBuilder(
    ({ name, image }) => ({
      aggregateName: 'product',
      aggregateId: uuid(),
      type: 'createProduct',
      payload: { name, image },
    }),
    []
  );

  const updateProduct = useCommandBuilder(
    ({ id, name, image }) => ({
      aggregateName: 'product',
      aggregateId: id,
      type: 'updateProduct',
      payload: { name, image },
    }),
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!editingExisting && !state.name) {
        setState({ ...state, nameIsInvalid: true });
      } else {
        fileAsData(state.image).then((imageData) => {
          const data = {
            name: state.name,
            image: imageData || (product && product.image),
          };
          if (editingExisting) updateProduct({ id: product.id, ...data });
          else createProduct(data);
          endEditing();
        });
      }
    },
    [
      editingExisting,
      product,
      setState,
      state,
      updateProduct,
      createProduct,
      endEditing,
    ]
  );

  return (
    <Card.Body>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={state.name}
            isInvalid={state.nameIsInvalid}
            onChange={productNameChanged}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Image</Form.Label>
          <Form.File
            label={(state.image && state.image.name) || 'Upload product image'}
            custom
            onChange={productImageChanged}
          />
        </Form.Group>

        {editingExisting ? (
          <Button type="submit">Save Changes</Button>
        ) : (
          <Button type="submit">Create Product</Button>
        )}

        <Button variant="primary" className="ml-2" onClick={endEditing}>
          Cancel
        </Button>
      </Form>
    </Card.Body>
  );
};

ProductCardEditBody.propTypes = {
  product: PropTypes.object,
  editingExisting: PropTypes.bool,
  endEditing: PropTypes.func,
};

export default ProductCardEditBody;
