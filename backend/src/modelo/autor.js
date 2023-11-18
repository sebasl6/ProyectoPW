import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

let Libro;

try {
  Libro = require('./libro.js').default;
} catch (error) {
  // Manejar el error, si es necesario
}

const Autor = sequelize.define('Autor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  apellido: {
    type: DataTypes.STRING,
  },
});

if (Libro) {
  Autor.hasMany(Libro, {
    foreignKey: 'idAutor'
  });
}

export default Autor;
