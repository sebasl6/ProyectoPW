
import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'
import libro from './libro.js'

const carta = sequelize.define('carta', {
    id: {
      // Sequelize module has INTEGER Data_Type.
      type: DataTypes.INTEGER,
      // To increment user_id automatically.
      autoIncrement: true,
      // user_id can not be null.
      allowNull: false,
      // For uniquely identify user.
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
carta.associate = function (models) {
    carta.belongsToMany(libro, { through: "Cartbook" });
    carta.hasOne(models.Checkout);
};

export default carta;