import {crearPlaneta, findDuplicatesPlaneta, actuPlaneta, getListaPlanetas, getPlan_Perso, getSinglePlaneta, borrPlaneta} from '../services/servicePlaneta.js'

export async function postPlaneta (req, res){
   const data = req.body
    const duplicado = await findDuplicatesPlaneta(data)
    console.log(duplicado)
    if(duplicado.length>0){
        return res.status(500).json({message:"EL planeta ya esta registrada"})
    }
    const planeta = await crearPlaneta(data)
    return res.status(200).json(planeta)
}

export async function getPlanetas (req, res){
    const page = parseInt(req.query.page, 10) 
    console.log(page)
    const limit = parseInt(req.query.limit,10) 
    console.log(limit)
    const planetas = await getListaPlanetas(page, limit);
    console.log("planetas ", planetas)
    if(!planetas){
        return res.status(404).json({error: 'NO hay planetas encontrados'})
    }
    return res.status(200).json(planetas)
}

export async function getSinPlaneta (req, res){
    const {id} = req.body
    console.log(id)
    const planeta = await getSinglePlaneta(id);
    //console.log("peliculas ", planeta)
    if(!planeta){
        return res.status(404).json({error: 'NO hay planetas encontrados'})
    }
    return res.status(200).json(planeta)
}

export async function getPersoPlane (req, res){
    const planetas = await getPlan_Perso();
    if(!planetas){
        return res.status(404).json({error: 'NO hay planetas encontrados'})
    }
    return res.status(200).json(planetas)
}

export async function putPlanetas(req, res){
    const data = req.body
    const duplicado = await findDuplicatesPlaneta(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"el planeta ya esta registrado"})
    }
    const planeta = await actuPlaneta(data)
    return res.status(200).json(planeta)
}

export async function delePlanetas(req, res){
    const {id} = req.body
    const borrar = await borrPlaneta(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con exito"})
    }
    return res.status(500).json({message:"El planeta no se encuentra o ya fue borrado"})
}