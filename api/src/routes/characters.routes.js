import { Router } from 'express';
import * as charactersController from '../controllers/characters.controllers'
import { authRegister} from '../middlewares';

const router = Router();

   /* endPoint /Characters */   
   /* Creación, Edición y Eliminación (CRUD) */
   router.post('/', authRegister.veryToken, charactersController.createCharacter)
   router.put('/:idCharacter', authRegister.veryToken, charactersController.updateCharacterById)
   router.delete('/:idCharacter', authRegister.veryToken, charactersController.deleteCharacterById)
   /* Detalle */
   router.get('/:idCharacter', charactersController.getCharacterById)
   /* Listado */
   router.get('/', charactersController.getCharactersAll)
   /* Búsquedas */
   router.get('/', charactersController.getCharactersByName)
   router.get('/', charactersController.getCharactersByAge)
   router.get('/', charactersController.getCharacterByMovies)
   
export default router;
