import { Pelicula } from "../models/modelPeliculas.js";

export async function crearPeli(data){
    try{
        const newPeli = await Pelicula.create(data)
        return newPeli
    } catch(error){
        console.error("Error al crear pelicula ", error)
    }
}

export async function actuPeli(data){
    try{
        const actuPeli = await Pelicula.findById(data._id)
        if(actuPeli){
            actuPeli.title = data.title || actuPeli.title
            actuPeli.director = data.director || actuPeli.director
            actuPeli.producer = data.producer || actuPeli.producer

            await actuPeli.save();
            return actuPeli
        }
    }catch(error){
        console.error("Error al actualizar pelicula ", error)
    }
}

export async function borrarPeli(data){
    try{
        await Pelicula.findByIdAndDelete(data._id)
        return {message:"Borrado con exito"}
    } catch(error){
        console.error("Error al borrar la pelicula ", error)
    }
}

export async function getListaPelis(){
    try{
        const lista_pelis = await Pelicula.find();
        return lista_pelis
    } catch(error){
        console.error("Error al obtener lista de peliculas ", error)
    }
}

export async function getSinglePeli(data){
    try{
        const single_peli = await Pelicula.findById(data._id)
        return single_peli
    } catch(error){
        console.error("Error al obtener pelicula ", error)
    }
}

export async function getPeli_Perso(){
    try{
        const single_peli = await Pelicula.find({},'_id title')
        return single_peli
    } catch(error){
        console.error("Error al obtener pelicula ", error)
    }
}