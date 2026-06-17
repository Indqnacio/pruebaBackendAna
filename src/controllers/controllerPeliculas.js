import {findDuplicatesMovies, createMovie, updateMovie, getAllMovies, getMoviesForCharacters, getSingleMovie, dropMovie} from "../services/servicePelicula.js";

export async function postMovies (req, res){
   const data = req.body
    const duplicado = await findDuplicatesMovies(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"La película ya está registrada"})
    }else{
         const peli = await createMovie(data)
    return res.status(200).json(peli)
    }

   
}

export async function getMovies (req, res){
    const page = parseInt(req.query.page, 10) 
    const limit = parseInt(req.query.limit,10) 
    const peliculas = await getAllMovies(page, limit);

    if(!peliculas){
        return res.status(404).json({error: 'No se encontraron películas'})
    }
    return res.status(200).json(peliculas)
}

export async function getMovie (req, res){
    const {id} = req.body
    const peliculas = await getSingleMovie(id);
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
        return res.status(500).json({message:"Esta película ya está registrada"})
    }
    const existente = await getSingleMovie(data._id)
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