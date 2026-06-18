import {createPlanet, findDuplicatesPlanets, updatePlanet, getAllPlanets, getPlanetsForCharacters, getPlanet, dropPlanet} from '../services/servicePlaneta.js'

export async function postPlanet (req, res){
   const data = req.body
    const duplicado = await findDuplicatesPlanets(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"El planeta ya está registrado"})
    }
    const planeta = await createPlanet(data)
    return res.status(200).json(planeta)
}

export async function getPlanets (req, res){
    const page = parseInt(req.query.page, 10) 
    const limit = parseInt(req.query.limit,10) 
    const planetas = await getAllPlanets(page, limit);
    if(!planetas){
        return res.status(404).json({message: 'No se encontraron Planetas'})
    }
    return res.status(200).json(planetas)
}

export async function getSinglePlanet (req, res){
    const {id} = req.body
    const planeta = await getPlanet(id);
    if(!planeta){
        return res.status(404).json({message: 'No se encontraron Planetas'})
    }
    return res.status(200).json(planeta)
}

export async function getPlanetsCharacters (req, res){
    const planetas = await getPlanetsForCharacters();
    if(!planetas){
        return res.status(404).json({message: 'No se encontraron Planetas'})
    }
    return res.status(200).json(planetas)
}

export async function putPlanet(req, res){
    const data = req.body
    const duplicado = await findDuplicatesPlanets(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"El planeta ya está registrado"})
    }
    const existente = await getPlanet(data._id)
        if(!existente||existente==null){
            return res.status(500).json({message:"No existe este planeta para actualizar"})
        }
    const planeta = await updatePlanet(data)
    return res.status(200).json(planeta)
}

export async function deletePlanet(req, res){
    const {id} = req.body
    const borrar = await dropPlanet(id)
    if(borrar!==null){
        return res.status(200).json({message:"Planeta borrado con exito"})
    }
    return res.status(500).json({message:"El planeta no se encuentra o ya fue borrado"})
}

export async function getPlanetsWOPag(req, res){
    
}