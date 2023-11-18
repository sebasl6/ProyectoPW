// models/administrador.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Administrador = sequelize.define('Administrador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  tipoDOC: {
    type: DataTypes.STRING,
  },
  apellido: {
    type: DataTypes.STRING,
  },
  nroDocumento: {
    type: DataTypes.STRING,
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
  },
  idioma: {
    type: DataTypes.STRING,
  },
  prefijo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imagenURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Administrador;
