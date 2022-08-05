import {Router} from 'express';
const router = Router();
import * as moviesControllers from '../controllers/movies.controllers'
import { authRegister} from '../middlewares';

   /* endPoint /Movies */
   /* Creación, Edición y Eliminación (CRUD) */
   router.post('/', authRegister.veryToken, moviesControllers.createMovie)
   router.put('/:idMovie', authRegister.veryToken, moviesControllers.updateMovie)
   router.delete('/:idMovie', authRegister.veryToken, moviesControllers.deleteMovie)
   /* Detalle */
   router.get('/:idMovie', moviesControllers.getMoviesById)
   /* Listado */
   router.get('/', moviesControllers.getMoviesAll);
   //Búquedas
   router.get('/', moviesControllers.getMoviesByName);
   router.get('/', moviesControllers.getMoviesByOrder);
   router.get('/', moviesControllers.getMoviesGender);

export default router;

