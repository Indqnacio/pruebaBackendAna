import {findDuplicatesStarships, createStarship, updateStarship, getAllStarships , getStarshipsForCharacters, getSingleStarship, dropStarship} from "../services/serviceNave.js";

export async function postStarship (req, res){
   const data = req.body
    const duplicado = await findDuplicatesStarships(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"La nave ya está registrada"})
    }
    const nave = await createStarship(data)
    return res.status(200).json(nave)
}

export async function getStarships (req, res){
    const page = parseInt(req.query.page, 10) 
    const limit = parseInt(req.query.limit,10) 
    const naves = await getAllStarships(page,limit);
    if(!naves){
        return res.status(404).json({error: 'No hay naves encontradas'})
    }
    return res.status(200).json(naves)
}

export async function getStarship (req, res){
    const {id} = req.body
    const nave = await getSingleStarship(id);
    if(!nave){
        return res.status(404).json({error: 'No hay naves encontradas'})
    }
    return res.status(200).json(nave)
}

export async function getStarshipsCharacters (req, res){
    
    const naves = await getStarshipsForCharacters();
    if(!naves){
        return res.status(404).json({error: 'No se encontraron naves'})
    }
    return res.status(200).json(naves)
}

export async function putStarships(req, res){
    const data = req.body
    const duplicado = await findDuplicatesStarships(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"La nave ya está registrada"})
    }
    const existente = await getSingleStarship(data._id)
    if(!existente||existente==null){
        return res.status(500).json({message:"No existe esta nave para actualizar"})
    }
    const nave = await updateStarship(data)
    return res.status(200).json(nave)
}

export async function deleteStarship(req, res){
    const {id} = req.body
    const borrar = await dropStarship(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con exito"})
    }
    return res.status(500).json({message:"La nave no se encuentra o ya fue borrada"})
}