import {Router} from 'express';
import * as authControllers from '../controllers/auth.controllers'
const router = Router();

    router.post('/login', authControllers.authLogin)
    router.post('/register',authControllers.authRegister)

export default router;
