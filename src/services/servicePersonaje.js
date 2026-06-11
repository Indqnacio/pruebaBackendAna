import {Personaje} from '../models/modelPersonaje.js'

export async function crearPersonaje(data){
     try{
        const newPerso = await Personaje.create(data);
        return newPerso
     } catch (error){
        console.error("Error al crear personaje ", error);
     }
}

export async function actuPerso(data){
    try{
        const personaje = await Personaje.findById(data._id)
        if(personaje){
            personaje.name = data.title || personaje.title
            personaje.birth_year = data.birth_year || personaje.birth_year
            personaje.eye_color = data.eye_color || acpersonajetuPeli.eye_color
            personaje.gender = data.gender || acpersonajetuPeli.gender
            personaje.hair_color = data.hair_color || acpersonajetuPeli.hair_color
            personaje.height = data.height || acpersonajetuPeli.height
            personaje.mass = data.mass || acpersonajetuPeli.mass
            personaje.skin_color = data.skin_color || acpersonajetuPeli.skin_color
            personaje.films = data.films || acpersonajetuPeli.films
            personaje.homeworld = data.homeworld || acpersonajetuPeli.homeworld
            personaje.species = data.species || acpersonajetuPeli.species
            personaje.starships = data.starships || acpersonajetuPeli.starships
            personaje.vehicles = data.vehicles || acpersonajetuPeli.vehicles

            await personaje.save();
            return (personaje)
        }
    }catch(error){
        console.error("Error al actualizar pelicula ", error)
    }
}

export async function borrarPerso(data){
    try{
        await Personaje.findByIdAndDelete(data._id)
        return {message:"Borrado con exito"}
    } catch(error){
        console.error("Error al borrar el personaje ", error)
    }
}

export async function getListaPerso(){
    try{
        const lista_personajes = await Personaje.find();
        return lista_personajes
    } catch(error){
        console.error("Error al obtener lista de peliculas ", error)
    }
}

export async function singlePerso(data){
    try{
        const personaje = await Personaje.findById(data._id);
        return personaje
    } catch(error){
        console.error("Error al obtener personaje ", error)
    }
}

export async function personaje_Nombre(data){
    try{
        const personaje = await Personaje.findOne({name: data.name})
        return personaje
    }catch(error){
        console.error("Error al obtener personaje")
    }
}