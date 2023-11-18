// models/libro.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Autor from './autor.js';
import Carta from './carta.js'; // Cambié 'carta' a 'Carta' para seguir la convención de nombres

const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
  },
  ISBN: {
    type: DataTypes.STRING,
  },
  serieTipo: {
    type: DataTypes.STRING,
  },
  inventario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

Libro.belongsTo(Autor, {
  foreignKey: {
    allowNull: false,
  },
});

Libro.belongsToMany(Carta, { through: "Cartbook" });

export default Libro;
