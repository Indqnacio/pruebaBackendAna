import {findDuplicatesMovies, createMovie, updateMovie, getAllMovies, getMoviesForCharacters, getSingleMovie, dropMovie} from "../services/servicePelicula.js";

export async function postMovies (req, res){
   const data = req.body
    const duplicado = await findDuplicatesMovies(data)
    console.log(duplicado)
    if(duplicado.length>0){
        return res.status(500).json({message:"La película ya está registrada"})
    }else{
         const peli = await createMovie(data)
    return res.status(200).json(peli)
    }

   
}

export async function getMovies (req, res){
    console.log("entro a peliculas")
    const page = parseInt(req.query.page, 10) 
    //console.log(page)
    const limit = parseInt(req.query.limit,10) 
   // console.log(limit)
    const peliculas = await getAllMovies(page, limit);
  //  console.log("peliculas ", peliculas)
    if(!peliculas){
        return res.status(404).json({error: 'No se encontraron películas'})
    }
    return res.status(200).json(peliculas)
}

export async function getMovie (req, res){
    const {id} = req.body
   // console.log(id)
    const peliculas = await getSingleMovie(id);
    //console.log("peliculas ", peliculas)
    if(!peliculas){
        return res.status(404).json({error: 'No se encontraron películas'})
    }
    return res.status(200).json(peliculas)
}

export async function getMovieCharacter (req, res){
    
    const peliculas = await getMoviesForCharacters();
    if(!peliculas){
        return res.status(404).json({error: 'No se encontraron películas'})
    }
    return res.status(200).json(peliculas)
}

export async function putMovie(req, res){
    const data = req.body
    const duplicado = await findDuplicatesMovies(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"No se encontraron películas"})
    }
    const existente = await getSingleMovie(data.id)
    if(!existente||existente==null){
        return res.status(500).json({message:"No existe esta película para actualizar"})
    }
    const peli = await updateMovie(data)
    return res.status(200).json(peli)
}

export async function deleteMovie(req, res){
    const {id} = req.body
    const borrar = await dropMovie(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con exito"})
    }
    return res.status(500).json({message:"La pelicula no se encuentra o ya fue borrada"})
}