import axios from 'axios';

const API_URL = 'http://localhost:3000/api/contactos';

export const getContactos = async () => await axios.get(API_URL)
export const getContacto = async (id) => await axios.get(`${API_URL}/${id}`)
export const createContacto = async (data) => await axios.post(API_URL, data)
export const updateContacto = async (id, data) => await axios.put(`${API_URL}/${id}`, data)
export const deleteContacto = async (id) => await axios.delete(`${API_URL}/${id}`)