import axios from 'axios';

const API_BASE = 'http://localhost:4000/products';

export const getAllProducts = () => {
  return axios.get(API_BASE);
};


export const createProduct = (data) =>
  axios.post(API_BASE, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateProduct = (id, data) =>
  axios.put(`${API_BASE}/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteProduct = (id) => {
  return axios.delete(`${API_BASE}/${id}`);
};
