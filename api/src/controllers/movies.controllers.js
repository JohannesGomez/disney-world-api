import { Characters,Movies,Genders} from '../dataBase'
import { Op } from 'sequelize';

/* Creación, Edición y Eliminación. (CRUD) */
export const createMovie = async (req, res, next) => {
  let createMovie = await Movies.create(req.body)
  try {
    await createMovie.addCharacters(req.body.idCharacters)
    return res.status(200).send(createMovie);
  } catch (error) {next(error);}
};

export const updateMovie = async (req, res, next) => {
  let findMovieById = await Movies.findByPk(req.params.idMovie)
  try {
    if(!findMovieById) return res.status(401).send({message:'Movie Not Found !'});
    await findMovieById.update(req.body);    
    await findMovieById.setCharacters(req.body.idCharacters);
    return res.status(200).send(findMovieById);
  } catch (error) {next(error);}
};

export const deleteMovie =  async (req, res, next) => {
  let findMovieById = await Movies.findByPk(req.params.idMovie)
  try {
    if(!findMovieById) return res.status(401).send({message:'Movie Not Found !'});
    await findMovieById.destroy()
    await findMovieById.removeCharacters(req.body.idCharacters);
    return res.status(204).send(findMovieById);
  } catch (error) {next(error);}
};

/*  Listado */
export const getMoviesAll = async (req, res, next) => {
    try {
        if(req.url==='/') {
          let getMoviesAll = await Movies.findAll(
          {attributes: ['imagen','titulo','fechaCreacion']})
          return res.status(200).send(getMoviesAll);
        }
    } catch (error) {next(error);}
    next();
}

/* Detalle */
export const getMoviesById = async (req, res, next) => {
    let {idMovie} = req.params;
    try {
        let getCharacterById = await Movies.findByPk(idMovie, {include:Characters})
        return res.status(200).send(getCharacterById)
    } catch (error) {next(error);}    
}

/*  Búsquedas */
export const getMoviesByName = async (req, res, next) => {
    let {name} = req.query;
    try {
        if(name) {
          console.log(name)
          let getMoviesByName = await Movies.findAll(
          {where: {titulo: { [Op.iLike]: `%${name}%`}}})  
          //{where: {titulo: name}, include: Characters});
          return res.status(200).send(getMoviesByName);
        }
    } catch (error) {next(error);}  
    next();
}

export const getMoviesByOrder = async (req, res, next) => {
    let {order} = req.query;
    try {
        if(order) {
          let getMoviesByOrder = await Movies.findAll(
          {order: [['fechaCreacion',order]],
          include: Characters});
          return res.status(200).send(getMoviesByOrder);
        }
    } catch (error) {next(error);}
    next();
}

export const getMoviesGender = async (req, res, next) => {
    let {genre} = req.query;
    try {
        if(genre) {
          let getMoviesGender = await Movies.findAll(
          {where: {genderId: genre}, include: Genders});
          return res.status(200).send(getMoviesGender);
        }
    } catch (error) {next(error);}
    next();
}

