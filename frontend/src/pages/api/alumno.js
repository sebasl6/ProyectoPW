// api/alumno.js

import base from './base.js';

const endpoint = '/alumno';

const findAll = async () => await base.get(endpoint);
const add = async (newUser) => await base.post(endpoint, newUser); // Modificado para aceptar datos del nuevo usuario
const update = async () => await base.put(endpoint);

const api = { findAll, add, update };

export default api;
