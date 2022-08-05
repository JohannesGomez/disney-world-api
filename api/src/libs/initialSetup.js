import {Genders} from '../dataBase'

export const addGenders = async () => {
    let addGenders = await Genders.findAll()
    if (addGenders.length===0) {
       await Promise.all([
         new Genders({name:'Ciencia Ficción'}).save()    
        ,new Genders({name:'Acción'}).save()
        ,new Genders({name:'Terror'}).save()
        ,new Genders({name:'Aventura'}).save()
        ,new Genders({name:'Drama'}).save()
        ,new Genders({name:'Suspenso'}).save()
    ])
    }    
}