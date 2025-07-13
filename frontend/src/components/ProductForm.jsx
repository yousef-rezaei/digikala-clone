import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api/products';

const ProductForm = ({ onSuccess, initialData }) => {
  initialData = initialData || {};

  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    description: initialData.description || '',
    image: null,
  });

  const [preview, setPreview] = useState(initialData.image || '');

  // useEffect(() => {
  //   if (initialData.image) setPreview(initialData.image);
  // }, [initialData]);
useEffect(() => {
  setFormData({
    name: initialData.name || '',
    price: initialData.price || '',
    description: initialData.description || '',
    image: null,
  });

  setPreview(initialData.image || '');
}, [initialData.name, initialData.price, initialData.description, initialData.image]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file)); // Preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('description', formData.description);
    if (formData.image) form.append('image', formData.image);

    const action = initialData.id
      ? updateProduct(initialData.id, form)
      : createProduct(form);

    action
      .then(() => {
        setFormData({ name: '', price: '', description: '', image: null });
        setPreview('');
        onSuccess();
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input name="price" type="number" value={formData.price} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input name="description" value={formData.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Image</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}
      </div>

      <button type="submit">
        {initialData.id ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
