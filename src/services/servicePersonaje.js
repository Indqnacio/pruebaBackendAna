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
        const personaje = await Personaje.findById(data.id)
        if(personaje){
            personaje.name = data.name || personaje.name
            personaje.birth_year = data.birth_year || personaje.birth_year
            personaje.eye_color = data.eye_color || personaje.eye_color
            personaje.gender = data.gender || personaje.gender
            personaje.hair_color = data.hair_color || personaje.hair_color
            personaje.height = data.height || personaje.height
            personaje.mass = data.mass || personaje.mass
            personaje.skin_color = data.skin_color || personaje.skin_color
            personaje.films = data.films || personaje.films
            personaje.homeworld = data.homeworld || personaje.homeworld
            personaje.species = data.species || personaje.species
            personaje.starships = data.starships || personaje.starships
            personaje.vehicles = data.vehicles || personaje.vehicles

            await personaje.save();
            return (personaje)
        }
    }catch(error){
        console.error("Error al actualizar pelicula ", error)
    }
}

export async function borrarPerso(data){
    try{
        await Personaje.findByIdAndDelete(data)
        return {message:"Borrado con exito"}
    } catch(error){
        console.error("Error al borrar el personaje ", error)
    }
}

export async function getListaPerso(page, limit){
    try{
        const select='_id name birth_year eye_color gender hair_color height mass skin_color films species starships vehicles'
        const options = {select:select,page: page, limit:limit, lean:true, }
        const lista_personajes = await Personaje.paginate({}, options);
        return lista_personajes
    } catch(error){
        console.error("Error al obtener lista de peliculas ", error)
    }
}

export async function singlePerso(data){
    try{
        const personaje = await Personaje.findById(data).select('_id name birth_year eye_color gender hair_color height mass skin_color films species starships vehicles');;
        return personaje
    } catch(error){
        console.error("Error al obtener personaje ", error)
    }
}

export async function personaje_Nombre(data){
    try{
        const personaje = await Personaje.findOne({name: data.name}).select('_id name birth_year eye_color gender hair_color height mass skin_color films species starships vehicles');
        return personaje
    }catch(error){
        console.error("Error al obtener personaje")
    }
}
export async function findDuplicatesPerso(data){
    try{
        const personaje = await Personaje.find({
            name:data.name,
            birth_year: data.birth_year,
            eye_color: data.eye_color,
            gender: data.gender,
            hair_color: data.hair_color,
            height: data.height,
            mass: data.mass,
            skin_color: data.skin_color,
            films: data.films,
            homeworld: data.homeworld,
            species: data.species,
            vehicles: data.vehicles,
        })
        return personaje
    }catch(error){
        console.error("Error encontrando duplicados de personaje ", error)
    }
}