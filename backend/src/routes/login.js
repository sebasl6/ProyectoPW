import express from 'express';
import alumnoController from '../controllers/alumno.js';

const router = express.Router();

// Ruta para la autenticación
router.post('/login', alumnoController.login);

export default router;
