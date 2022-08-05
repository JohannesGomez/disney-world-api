import {Router} from 'express'
import authRouter       from './auth.routes';
import charactersRouter from './characters.routes';
import moviesRouter     from './movies.routes';

const router = Router();
    router.use('/auth',authRouter);
    router.use('/characters',charactersRouter);
    router.use('/movies',moviesRouter)
export default router;