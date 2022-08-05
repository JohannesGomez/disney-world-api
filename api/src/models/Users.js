const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { // defini la entidad
  // defino el modelo
  sequelize.define('users', {
    id         : { 
                 type         : DataTypes.UUID,  
                 defaultValue : DataTypes.UUIDV4,
                 primaryKey   : true,            
                 allowNull    : false,},
    userName   : { 
                  type: DataTypes.STRING,
                  allowNull: false,
                  unique: true,},
    email      : { 
                  type: DataTypes.STRING,
                  allowNull: false,
                  unique: true,},
    password   : { 
                  type: DataTypes.STRING,
                  allowNull: false,
                  require: true},
     });
};

