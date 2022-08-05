import { Characters, Movies} from '../dataBase'
import { Op } from 'sequelize';

/* Creación, Edición y Eliminación. (CRUD) */
export const createCharacter = async (req, res, next) => {
   try {
     let createCharacter = await Characters.create(req.body)
     return res.status(201).send(createCharacter);
   } catch (error) {next(error);}
};

export const updateCharacterById = async (req, res, next) => {
    try {
        let findCharacterById = await Characters.findByPk(req.params.idCharacter)
        if(!findCharacterById) return res.status(401).send({message:'Characters Not Found !'});
        await findCharacterById.update(req.body)
        return res.status(200).send(findCharacterById);
    } catch (error) {next(error);};
};
  
export const deleteCharacterById = async (req, res, next) => {
    try {
      let findCharacterById = await Characters.findByPk(req.params.idCharacter)
      if(!findCharacterById) return res.status(401).send({message:'Character Not Found !'});
      await findCharacterById.destroy()
      return res.status(200).send(findCharacterById);
    } catch (error) {next(error);}
  };

/* Detalle */
export const getCharacterById = async (req,res,next) => {
  let {idCharacter} = req.params
  try {
      if(idCharacter) {
       let getCharacterById = await Characters.findByPk(
       idCharacter,{include:Movies})
       return res.status(200).send(getCharacterById)
      }
  }catch(error) {next(error)};
}

/*  Listado */
export const getCharactersAll = async (req, res, next) => {
    try {
        if(req.url==='/') {
          let getCharactersAll = await Characters.findAll(
          {attributes: ['imagen','nombre']})
          return res.status(200).send(getCharactersAll)
        }
        next()
    } catch (error) {next(error);}
}

/*  Búsquedas */
export const getCharactersByName = async (req, res, next) => {
    let {name} = req.query
    try {
        if(name) {
          let getCharactersByName = await Characters.findAll(
          {where: {nombre: { [Op.iLike]: `%${name}%`}}})
          return res.status(200).send(getCharactersByName)
        }
        next()
    } catch (error) {next(error);}
 }

export const getCharactersByAge = async (req, res, next) => {
    let {age} = req.query
    try {
        if(age) {
          let getCharactersByAge = await Characters.findAll(
          {where: {edad: parseInt(req.query.age)}, include: Movies});
          return res.status(200).send(getCharactersByAge);
        }
        next()
    } catch (error) {next(error);}
}

export const getCharacterByMovies = async (req, res, next) => {
    let idMovie = req.query.movies
    try {
        if(idMovie) {
          let getCharacterByMovies = await Characters.findAll(
          {include: {model:Movies, where: {id: idMovie,},}})
          return res.status(200).send(getCharacterByMovies);
        }
        next()
    } catch (error) {next(error);}
}
