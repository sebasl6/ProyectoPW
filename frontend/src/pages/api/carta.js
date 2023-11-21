import base from './base.js'

const endpoint = '/carta';

const findAll = async () => await base.get(endpoint);
const create = async () => await base.post(endpoint);
const update = async () => await base.put(endpoint);
const borrar = async () => await base.delete(endpoint);
const api = { findAll, create, update, borrar}

export default api;