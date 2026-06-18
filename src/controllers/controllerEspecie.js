import {findDuplicatesSpecie, createSpecie, updateSpecie, getAllSpecies, getSpecieForCharacters, getSingleSpecie, dropSpecie} from "../services/serviceEspecie.js";

export async function postSpecie (req, res){
   const data = req.body
    const duplicado = await findDuplicatesSpecie(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"La especie ya está registrada"})
    }
    const especie = await createSpecie(data)
    return res.status(200).json(especie)
}

export async function getSpecies (req, res){
    const page = parseInt(req.query.page, 10) 
    const limit = parseInt(req.query.limit,10) 
    const especies = await getAllSpecies(page,limit);
    
    if(!especies){
        return res.status(404).json({error: 'No se encontraron especies'})
    }
    return res.status(200).json(especies)
}

export async function getSpecie (req, res){
    const {id} = req.body
    const especie = await getSingleSpecie(id);
    if(!especie){
        return res.status(404).json({error: 'No se encontraron especies'})
    }
    return res.status(200).json(especie)
}

export async function getSpeciesCharacters (req, res){
    
    const especies = await getSpecieForCharacters();
    if(!especies){
        return res.status(404).json({error: 'No se encontraron especies'})
    }
    return res.status(200).json(especies)
}

export async function putSpecie(req, res){
    const data = req.body
    const duplicado = await findDuplicatesSpecie(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"La especie ya está registrada"})
    }    
    const existente = await getSingleSpecie(data._id)
    if(!existente||existente==null){
        return res.status(500).json({message:"No existe esta especie para actualizar"})
    }
    const especie = await updateSpecie(data)
    return res.status(200).json(especie)
}

export async function deleteSpecie(req, res){
    const id = req.body.id;
    const find = await getSingleSpecie(id);
    const borrar = await dropSpecie(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con éxito"})
    }
    return res.status(500).json({message:"La especie no se encuentra o ya fue borrada"})
}