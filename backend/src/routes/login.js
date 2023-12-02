// Importa express y controlador de autenticación de alumnos
import express from 'express';
import alumnoController from '../controllers/alumno.js';
import cors from 'cors'

const router = express.Router();

// Ruta para la autenticación de alumnos
router.post('/login', cors(), alumnoController.login);

export default router;
