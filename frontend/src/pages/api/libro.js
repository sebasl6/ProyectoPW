// Importa axios u otra librería que estés utilizando para hacer las solicitudes HTTP
import axios from 'axios';
import base from './base.js';

const endpoint = '/libro';

const findAll = async () => await base.get(endpoint);

// Nueva función para buscar libros por nombre
const findLibrosByNombre = async (nombre) => {
  try {
    const response = await base.get(`${endpoint}/buscarPorNombre?nombre=${nombre}`);
    return response.data; // Ajusta según la estructura de tu respuesta
  } catch (error) {
    console.error('Error al buscar libros por nombre:', error);
    return null;
  }
};

// Nueva función para buscar libros por ISBN
const findLibroByISBN = async (isbn) => {
  try {
    const response = await base.get(`${endpoint}/buscarPorISBN?isbn=${isbn}`);
    return response.data; // Ajusta según la estructura de tu respuesta
  } catch (error) {
    console.error('Error al buscar libro por ISBN:', error);
    return null;
  }
};

// Nueva función para buscar libros por autor
const findLibrosByAutor = async (autor) => {
  try {
    const response = await base.get(`${endpoint}/buscarPorAutor?autor=${autor}`);
    return response.data; // Ajusta según la estructura de tu respuesta
  } catch (error) {
    console.error('Error al buscar libros por autor:', error);
    return null;
  }
};

const api = { findAll, findLibrosByNombre, findLibroByISBN, findLibrosByAutor };

export default api;
