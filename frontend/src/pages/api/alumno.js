// api/alumno.js
import base from './base.js';

const endpoint = '/alumno';

const findAll = async () => await base.get(endpoint);
const add = async (newUser) => await base.post(endpoint, newUser);
const update = async (updatedUser) => await base.put(endpoint, updatedUser);
const findOne = async (id) => await base.get(`${endpoint}/${id}`);
const remove = async (id) => await base.delete(`${endpoint}/${id}`);
const findByCorreo = async (correo) => await base.get(`${endpoint}/by-correo/${correo}`);
const login = async (credentials) => await base.post(`/auth${endpoint}/login`, credentials);  // Modificado para reflejar la nueva estructura

const api = { findAll, add, update, findOne, remove, findByCorreo, login };

export default api;
