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
  const [name, setName] = useState(editingExisting ? product.name : '');
  const [nameIsInvalid, setNameIsInvalid] = useState(false);
  const [image, setImage] = useState();

  const nameChanged = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const imageChanged = useCallback(
    (e) => {
      setImage(e.target.files[0]);
    },
    [setImage]
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
      if (!editingExisting && !name) {
        setNameIsInvalid(true);
      } else {
        fileAsData(image).then((imageData) => {
          const data = {
            name,
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
      name,
      image,
      setNameIsInvalid,
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
            value={name}
            isInvalid={nameIsInvalid}
            onChange={nameChanged}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Image</Form.Label>
          <Form.File
            label={(image && image.name) || 'Upload product image'}
            custom
            onChange={imageChanged}
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
