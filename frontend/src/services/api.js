import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export const getTransactions = () => axios.get(`${API_URL}/transactions`);
export const createTransaction = (data) => axios.post(`${API_URL}/transactions`, data);
export const updateTransaction = (id, data) => axios.put(`${API_URL}/transactions/${id}`, data);
export const deleteTransaction = (id) => axios.delete(`${API_URL}/transactions/${id}`);
export const getCategories = () => axios.get(`${API_URL}/categories`);