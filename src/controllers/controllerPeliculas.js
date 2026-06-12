import {findDuplicatesPeli, crearPeli, actuPeli, getListaPelis, getPeli_Perso, getSinglePeli, borrarPeli} from "../services/servicePelicula.js";

export async function postPeliculas (req, res){
   const data = req.body
    const duplicado = await findDuplicatesPeli(data)
    console.log(duplicado)
    if(duplicado.length>0){
        return res.status(500).json({message:"La pelicula ya esta registrada"})
    }
    const peli = await crearPeli(data)
    return res.status(200).json(peli)
}

export async function getPeliculas (req, res){
    const page = parseInt(req.query.page, 10) 
    console.log(page)
    const limit = parseInt(req.query.limit,10) 
    console.log(limit)
    const peliculas = await getListaPelis(page, limit);
    console.log("peliculas ", peliculas)
    if(!peliculas){
        return res.status(404).json({error: 'NO hay peliculas encontradas'})
    }
    return res.status(200).json(peliculas)
}

export async function getSinPeli (req, res){
    const {id} = req.body
    console.log(id)
    const peliculas = await getSinglePeli(id);
    console.log("peliculas ", peliculas)
    if(!peliculas){
        return res.status(404).json({error: 'NO hay peliculas encontradas'})
    }
    return res.status(200).json(peliculas)
}

export async function getPersoPeli (req, res){
    
    const peliculas = await getPeli_Perso();
    if(!peliculas){
        return res.status(404).json({error: 'NO hay peliculas encontradas'})
    }
    return res.status(200).json(peliculas)
}

export async function putPeliculas(req, res){
    const data = req.body
    const duplicado = await findDuplicatesPeli(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"La pelicula ya esta registrada"})
    }
    const peli = await actuPeli(data)
    return res.status(200).json(peli)
}

export async function delePeliculas(req, res){
    const {id} = req.body
    const borrar = await borrarPeli(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con exito"})
    }
    return res.status(500).json({message:"La pelicula no se encuentra o ya fue borrada"})
}