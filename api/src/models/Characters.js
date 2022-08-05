const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { 
  // defino el modelo
  sequelize.define('characters', { 
    id         : { 
                 type         : DataTypes.UUID, 
                 defaultValue : DataTypes.UUIDV4,
                 primaryKey   : true,  
                 allowNull    : false,},
    imagen     : { 
                  type: DataTypes.STRING,
                  allowNull: true,},
    nombre     : { 
                  type: DataTypes.STRING,
                  allowNull: true,},
    edad       : { 
                  type: DataTypes.INTEGER,
                  allowNull: true,},
    peso       : { 
                  type: DataTypes.DOUBLE,
                  allowNull: true,},
    historial  : { 
                 type: DataTypes.STRING,
                 allowNull: true,},
 
     });
};

