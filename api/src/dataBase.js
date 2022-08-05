import {Sequelize} from 'sequelize';
import fs from 'fs';
import path from 'path'
import dotenv from "dotenv";
dotenv.config();

const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;  
console.log('DataBase :',DB_NAME)
let sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME }`,
   { logging: false, native: false });
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries); 

console.log('Tablas : ',sequelize.models)

const { Characters,Movies,Genders,Users} = sequelize.models; // Modelos de sequelize las tablas que se crearon

// Relacion de muchos a muchos
Characters.belongsToMany(Movies, {through : 'CharactersMovies'}); // tabla intermedia
Movies.belongsToMany(Characters, {through : 'CharactersMovies'}); // tabla intermedia
// Relación de muchos a uno
Genders.hasMany(Movies);
Movies.belongsTo(Genders)

 module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
 };

