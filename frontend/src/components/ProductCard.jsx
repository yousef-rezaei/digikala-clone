import React from 'react';
import DeleteButton from './DeleteButton';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>{product.price} $</strong>
        <div className="actions">
          <button className="edit-btn" onClick={() => onEdit(product)}>Edit</button>
          <DeleteButton id={product.id} onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
