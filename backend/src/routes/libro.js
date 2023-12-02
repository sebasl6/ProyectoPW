import express from 'express'

import libroController from '../controllers/libro.js'

const routes = express.Router()

// Rutas para libros
routes.get('/libros', libroController.findAll);
routes.post('/libros', libroController.create);
routes.get('/libros/:id', libroController.findOne);
routes.put('/libros', libroController.update);
routes.delete('/libros/:id', libroController.remove);
routes.get('/libros/by-autor/:autor', libroController.findLibrosByAutor);
routes.get('/libros/by-titulo/:titulo', libroController.findLibrosByTitulo);

export default routes;