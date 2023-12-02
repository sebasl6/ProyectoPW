import express from 'express';
import alumnoController from '../controllers/alumno.js';

const router = express.Router();

router.get('/', alumnoController.findAll);
router.post('/', alumnoController.create);
router.get('/:id', alumnoController.findOne);
router.put('/:id', alumnoController.update);
router.delete('/:id', alumnoController.remove);


// Nueva ruta para buscar alumno por correo
router.get('/by-correo/:correo', alumnoController.findAlumnoByCorreo);

export default router;
