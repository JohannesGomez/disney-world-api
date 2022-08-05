import jwt from 'jsonwebtoken';
import {Users} from '../dataBase';

export const veryToken = async (req, res, next) => {
   let token = req.headers['x-access-token']
   try {
       if(!token) res.status(403).send({message:'Require Authenticationn !'})
       let VerifyTokenUser = jwt.verify(token,process.env.TOKEN_SECRET)
       req.userId = VerifyTokenUser.id 
       let findUser = await Users.findByPk(req.userId)
       if(!findUser) return res.status(401).send({message:'User Not Register !'})
       next();    
   } catch (error) {next(error);}
}

