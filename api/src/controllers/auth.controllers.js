import {Users,Roles} from '../dataBase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {emailWelcome} from '../libs/email';

export const authRegister = async (req, res, next) => {
    try {
        let {userName, email, password} = req.body
        let findUserEmail = await Users.findOne({where:{email}})
        if(findUserEmail) {
          let token = jwt.sign({id:findUserEmail.id},process.env.TOKEN_SECRET,{expiresIn:'1d'})
          return res.status(200).send({token:token})
        }
        const newUser = new Users({
            userName,
            email,
            password : await encryptPassword(password)
        })
        let newUserBd = await newUser.save() 
        let token = jwt.sign({id:newUserBd.id},process.env.TOKEN_SECRET,{expiresIn:'1d'})
        emailWelcome(email) 
        return res.status(200).send({token:token})        
    } catch (error) {next(error);}
};

export const authLogin = async (req, res, next) => {
    try {
        let {email,password} = req.body
        let findUserEmail = await Users.findOne({where:{email}})
        if(!findUserEmail) return res.status(400).send({message:'User Is Not Registered !'})
        let comparePasswordUser =  await comparePassword(password, findUserEmail.password)
        if(!comparePasswordUser) return res.status(401).send({token:null, message:'Invalid Password !'})
        let token = jwt.sign({id:findUserEmail.id},process.env.TOKEN_SECRET,{expiresIn:'1d'}) 
        return res.status(200).send({token:token})        
    } catch (error) {next(error);}
}

const encryptPassword = async (password)=> {
   let genesalt = await bcrypt.genSalt(10) 
   return await bcrypt.hash(password,genesalt)
}

const comparePassword = async (passwordBody,passwordBd) => {
    return await bcrypt.compare(passwordBody,passwordBd)
}