import {findDuplicates_Especie, crearEspecie, actuEspecie, getListaEspecie, getEsp_Perso, getSingleEspecie, borrarEsp} from "../services/serviceEspecie.js";

export async function postEspecie (req, res){
   const data = req.body
    const duplicado = await findDuplicates_Especie(data)
    console.log(duplicado)
    if(duplicado.length>0){
        return res.status(500).json({message:"La especie ya esta registrada"})
    }
    const especie = await crearEspecie(data)
    return res.status(200).json(especie)
}

export async function getEspecies (req, res){
    const especies = await getListaEspecie();
    //console.log("peliculas ", peliculas)
    if(!especies){
        return res.status(404).json({error: 'NO hay especies encontradas'})
    }
    return res.status(200).json(especies)
}

export async function getSinEspecie (req, res){
    const {id} = req.body
    //console.log(id)
    const especie = await getSingleEspecie(id);
   // console.log("peliculas ", peliculas)
    if(!especie){
        return res.status(404).json({error: 'NO hay especies encontradas'})
    }
    return res.status(200).json(especie)
}

export async function getPersoEspe (req, res){
    
    const especies = await getEsp_Perso();
    if(!especies){
        return res.status(404).json({error: 'NO hay especies encontradas'})
    }
    return res.status(200).json(especies)
}

export async function putEspecie(req, res){
    const data = req.body
    const duplicado = await findDuplicates_Especie(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"La especie ya esta registrada"})
    }
    const especie = await actuEspecie(data)
    return res.status(200).json(especie)
}

export async function delEspecie(req, res){
    const {id} = req.body
    const borrar = await borrarEsp(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con exito"})
    }
    return res.status(500).json({message:"La especie no se encuentra o ya fue borrada"})
}