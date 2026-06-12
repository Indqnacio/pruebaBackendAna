import {findDuplicates_Nave, crearNave, actuNave, getListaNave, getNave_Perso, getSingleNave, borrNave} from "../services/serviceNave.js";

export async function postNave (req, res){
   const data = req.body
    const duplicado = await findDuplicates_Nave(data)
    console.log(duplicado)
    if(duplicado.length>0){
        return res.status(500).json({message:"La nave ya esta registrada"})
    }
    const nave = await crearNave(data)
    return res.status(200).json(nave)
}

export async function getNaves (req, res){
    const page = parseInt(req.query.page, 10) 
    console.log(page)
    const limit = parseInt(req.query.limit,10) 
    console.log(limit)
    const naves = await getListaNave(page,limit);
    //console.log("peliculas ", peliculas)
    if(!naves){
        return res.status(404).json({error: 'NO hay naves encontradas'})
    }
    return res.status(200).json(naves)
}

export async function getSin_Nave (req, res){
    const {id} = req.body
   // console.log(id)
    const nave = await getSingleNave(id);
   // console.log("peliculas ", peliculas)
    if(!nave){
        return res.status(404).json({error: 'NO hay nave encontradas'})
    }
    return res.status(200).json(nave)
}

export async function getPersoNave (req, res){
    
    const naves = await getNave_Perso();
    if(!naves){
        return res.status(404).json({error: 'NO hay naves encontradas'})
    }
    return res.status(200).json(naves)
}

export async function putNaves(req, res){
    const data = req.body
    const duplicado = await findDuplicates_Nave(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"La nave ya esta registrada"})
    }
    const nave = await actuNave(data)
    console.log(nave)
    return res.status(200).json(nave)
}

export async function deleNave(req, res){
    const {id} = req.body
    const borrar = await borrNave(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con exito"})
    }
    return res.status(500).json({message:"La nave no se encuentra o ya fue borrada"})
}