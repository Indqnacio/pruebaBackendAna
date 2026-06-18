import {Personaje} from '../models/modelPersonaje.js'

export async function createCharacter(data){
     try{
        const newPerso = await Personaje.create(data);
        return newPerso
     } catch (error){
        console.error("Error al crear personaje ", error);
     }
}

export async function updateCharacter(data){
    try{
        const personaje = await Personaje.findById(data._id)
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
        console.error("Error al actualizar personaje ", error)
    }
}

export async function dropCharacter(data){
    try{
        const deleted = await Personaje.findByIdAndDelete(data)
        if(deleted){
            return {message:"Borrado con éxito"}
        }
        return null
    } catch(error){
        console.error("Error al borrar el personaje ", error)
    }
}

export async function getAllCharacters(page, limit){
    try{
        const select='_id homeworld birth_year eye_color gender hair_color height mass skin_color films species name starships vehicles'
        const populate=('homeworld','name')
        const options = {
            select:select, 
            page: page, 
            limit:limit, 
            lean:true, 
            populate:[{path:'homeworld', select:'name'},
                    {path:'films', select:'title'},
                    {path:'species', select:'name'},
                    {path:'vehicles', select:'name'},
                    {path:'starships', select:'name'},
            ]}
        const lista_personajes = await Personaje.paginate({}, options);
        return lista_personajes
    } catch(error){
        console.error("Error al obtener lista de personajes ", error)
    }
}

export async function getSingleCharacter(data){
    try{
        const personaje = await Personaje.findById(data).select('_id name birth_year eye_color gender hair_color height mass skin_color films species starships vehicles homeworld');;
        return personaje
    } catch(error){
        console.error("Error al obtener personaje ", error)
    }
}

export async function getCharactersByName(data){
    try{
        const personaje = await Personaje.findOne({name: data}).select('_id name birth_year eye_color gender hair_color height mass skin_color films species starships vehicles homeworld');
        return personaje
    }catch(error){
        console.error("Error al obtener personaje")
    }
}
export async function findDuplicatesCharacter(data){
    try{
        const personaje = await Personaje.find({
            name:data.name,
            _id: { $ne: data._id }
        })
        return personaje
    }catch(error){
        console.error("Error encontrando duplicados de personaje ", error)
    }
}