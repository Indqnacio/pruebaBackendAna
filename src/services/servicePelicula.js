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
        const actuPeli = await Pelicula.findById(data.id)
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

export async function borrarPeli(id){
    try{
        await Pelicula.findByIdAndDelete(id)
        return {message:"Borrado con exito"}
    } catch(error){
        console.error("Error al borrar la pelicula ", error)
    }
}

export async function getListaPelis(page, limit){
    try{
        const select='_id title director producer'
        const options = {select:select,page: page, limit:limit, lean:true, }
        const lista_pelis = await Pelicula.paginate({}, options);
        return lista_pelis
    } catch(error){
        console.error("Error al obtener lista de peliculas ", error)
    }
}

export async function getSinglePeli(data){
    try{
        console.log(data)
        const single_peli = await Pelicula.findById(data).select('title director producer')
        console.log(single_peli)
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

export async function findDuplicatesPeli(data){
    try{
        const peli = await Pelicula.find({
            title:data.title,
            director: data.director,
            producer: data.producer
        })
        return peli
    }catch(error){
        console.error("Error encontrando duplicados de nave ", error)
    }
}