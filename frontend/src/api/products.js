import axios from 'axios';

// const API_BASE_URL = 'http://localhost:4000/products';
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/products`);
  return res.json();
}
export const getAllProducts = () => {
  return axios.get(API_BASE_URL);
};


export const createProduct = (data) =>
  axios.post(API_BASE_URL, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateProduct = (id, data) =>
  axios.put(`${API_BASE_URL}/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteProduct = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
