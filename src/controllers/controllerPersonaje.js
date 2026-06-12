import {findDuplicatesPerso, crearPersonaje, actuPerso, getListaPerso, singlePerso, borrarPerso, personaje_Nombre} from "../services/servicePersonaje.js";

export async function postPersonaje (req, res){
   const data = req.body
   console.log(data)
    const duplicado = await findDuplicatesPerso(data)
   // console.log(duplicado)
    if(duplicado.length>0){
        return res.status(500).json({message:"el personaje ya esta registrado"})
    }
    const personaje = await crearPersonaje(data)
    return res.status(200).json(personaje)
}

export async function getPersonajes (req, res){
    const page = parseInt(req.query.page, 10) 
    console.log(page)
    const limit = parseInt(req.query.limit,10) 
    console.log(limit)
    const personajes = await getListaPerso(page, limit);
    //console.log("peliculas ", peliculas)
    if(!personajes){
        return res.status(404).json({error: 'NO hay personajes encontrados'})
    }
    return res.status(200).json(personajes)
}

export async function getSinglePersonaje (req, res){
    const {id} = req.body
   // console.log(id)
    const personaje = await singlePerso(id);
   // console.log("peliculas ", peliculas)
    if(!personaje){
        return res.status(404).json({error: 'NO hay personaje encontrado'})
    }
    return res.status(200).json(personaje)
}

export async function findByNombre (req, res){
    const {name} = req.body
    const personaje = await personaje_Nombre(name);
    if(!personaje){
        return res.status(404).json({error: 'NO hay personaje encontrado'})
    }
    return res.status(200).json(personaje)
}

export async function putPerso(req, res){
    const data = req.body
    const duplicado = await findDuplicatesPerso(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"el personaje ya esta registrado"})
    }

    const personaje = await actuPerso(data)
    if(personaje===null||!personaje){
        console.log("nohay")
        return res.status(500).json({message:"El personaje no existe"})
    }
    return res.status(200).json(personaje)
}

export async function deletePersonaje(req, res){
    const {id} = req.body
    const borrar = await borrarPerso(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con exito"})
    }
        return res.status(500).json({message:"El personaje no se encuentra o ya fue borrado"})
}