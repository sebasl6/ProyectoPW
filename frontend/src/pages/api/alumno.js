// api/alumno.js
import base from './base.js';

const endpoint = '/alumno';

const findAll = async () => await base.get(endpoint);
const add = async (newUser) => await base.post(endpoint, newUser);
const update = async (updatedUser) => await base.put(endpoint, updatedUser);
const findOne = async (id) => await base.get(`${endpoint}/${id}`);
const remove = async (id) => await base.delete(`${endpoint}/${id}`);
const findByCorreo = async (correo) => await base.get(`${endpoint}/by-correo/${correo}`);

// Asegúrate de tener esta función authenticate
const login = async (credentials) => await base.post(`${endpoint}/login`, credentials);

const api = { findAll, add, update, findOne, remove, findByCorreo, login };

export default api;
