import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Alumno = sequelize.define('alumno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    tipoDOC: {
        type: DataTypes.STRING
    },
    nroDocumento: {
        type: DataTypes.STRING,
        unique: true
    },
    correo:{
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    imagenURL:{
        type: DataTypes.STRING,
        allowNull: true
    },
    esAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export default Alumno