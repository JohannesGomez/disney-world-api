const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { 
  // defino el modelo
  sequelize.define('movies', { 
    id         : { 
                 type         : DataTypes.UUID,
                 defaultValue : DataTypes.UUIDV4,
                 primaryKey   : true,  
                 allowNull    : false,},
    imagen      : { 
                  type: DataTypes.STRING,
                  allowNull: true,},
    titulo     : { 
                  type: DataTypes.STRING,
                  allowNull: true,},
    fechaCreacion : { 
                  type: DataTypes.DATE,
                  allowNull: true,},
    calificacion  : { 
                  type: DataTypes.INTEGER,
                  allowNull: true,},
     });
};

