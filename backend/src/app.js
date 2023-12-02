import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import loginRoutes from './routes/login.js';
import adminRoutes from './routes/admin.js';
import alumnoRoutes from './routes/alumno.js';
import libroRoutes from './routes/libro.js';
import autorRoutes from './routes/autor.js';
import cartaRoutes from './routes/carta.js';

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ result: 'OK' });
});

// Middleware para las rutas de autenticación de alumnos
app.use("/login", loginRoutes);

// Rutas para otras partes de la aplicación
app.use("/alumno", alumnoRoutes);
app.use("/admin", adminRoutes);
app.use("/autor", autorRoutes);
app.use("/libro", libroRoutes);
app.use("/carta", cartaRoutes);

export default app;
