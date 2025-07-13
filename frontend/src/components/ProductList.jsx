import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import DeleteButton from './DeleteButton';
import { getAllProducts, deleteProduct } from '../api/products';
import '../App.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = () => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDone = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => fetchProducts())
      .catch((err) => console.error(err));
  };

 return (
  <div className="container">
  <h2>Product List</h2>

  <ProductForm onSuccess={handleDone} initialData={editingProduct} />

  <div className="product-grid">
    {products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    onEdit={handleEdit}
    onDelete={() => handleDelete(product.id)}
  />
))}

  </div>
</div>

);
};

export default ProductList;
