import {findDuplicatesCharacter, createCharacter, updateCharacter, dropCharacter, getSingleCharacter, getAllCharacters,getCharactersByName} from "../services/servicePersonaje.js";

export async function postCharacter (req, res){
   const data = req.body
    const duplicado = await findDuplicatesCharacter(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"El personaje ya está registrado"})
    }
    const personaje = await createCharacter(data)
    return res.status(200).json(personaje)
}

export async function getCharacters (req, res){
    const page = parseInt(req.query.page, 10) 
    const limit = parseInt(req.query.limit,10) 
    const personajes = await getAllCharacters(page, limit);
    if(!personajes){
        return res.status(404).json({error: 'No se encontraron personajes'})
    }
    return res.status(200).json(personajes)
}

export async function getCharacter (req, res){
    const {id} = req.body
    const personaje = await getSingleCharacter(id);
    if(!personaje){
        return res.status(404).json({error: 'No se encontraron personajes'})
    }
    return res.status(200).json(personaje)
}

export async function charactersByName (req, res){
    const {name} = req.body
    const personaje = await getCharactersByName(name);
    if(!personaje){
        return res.status(404).json({error: 'NO hay personaje encontrado'})
    }
    return res.status(200).json(personaje)
}

export async function putCharacter(req, res){
    const data = req.body
    const duplicado = await findDuplicatesCharacter(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"el personaje ya esta registrado"})
    }
    const existente = await getSingleCharacter(data.id)
    if(!existente||existente==null){
        return res.status(500).json({message:"No existe este personaje para actualizar"})
    }
    const personaje = await updateCharacter(data)
    return res.status(200).json(personaje)
}

export async function deleteCharacter(req, res){
    const {id} = req.body
    const borrar = await dropCharacter(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con exito"})
    }
        return res.status(500).json({message:"El personaje no se encuentra o ya fue borrado"})
}