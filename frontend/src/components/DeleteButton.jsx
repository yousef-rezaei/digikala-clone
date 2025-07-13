import React from 'react';
import { deleteProduct } from '../api/products';

const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = () => {
    deleteProduct(id)
      .then(() => onDelete())
      .catch((err) => console.error(err));
  };

  return (
  <button className="delete-btn" onClick={handleDelete}>
    Delete
  </button>
);

};

export default DeleteButton;
