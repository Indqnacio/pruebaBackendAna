import { Especie } from "../models/modelEspecie.js"

export async function createSpecie(data){
    try{
        const newEspecie = await Especie.create(data);
        return newEspecie
    }catch(error){
        console.error("Error al crear especie ", error);
    }
}

export async function updateSpecie(data){
    try{
        const especie = await Especie.findById(data._id);
        if(especie){
            especie.name = data.name||especie.name
            especie.classification=data.classification|| especie.classification
            especie.designation=data.designation|| especie.designation
            especie.average_height=data.average_height||especie.average_height
            especie.average_lifespan=data.average_lifespan||especie.average_lifespan
            especie.eye_colors=data.eye_colors||especie.eye_colors
            especie.hair_colors=data.hair_colors|| especie.hair_colors
            especie.skin_colors=data.skin_colors|| especie.skin_colors
            especie.language=data.language||especie.language
            especie.homeworld = data.homeworld|| especie.homeworld
            await especie.save()
            return especie
        }
    }
    catch(error){
        console.error("Error al actualizar especie ", error);
    }
}

export async function getAllSpecies(page, limit){
    try{
       // const skip=(page-1)*limit
        const select= 'name classification designation average_height average_lifespan eye_colors hair_colors skin_colors language homeworld'
        const options = {
            select:select,
            page: page, 
            limit:limit, 
            lean:true, 
            populate:[{path:'homeworld', select:'name'}]}
    
        const lista_especies = await Especie.paginate({}, options);
        
        //const total_pages = Math.ceil(totalDocs/limit);
        return lista_especies
    }catch(error){
        console.error("Error al consultar lista de especies ", error)
    }
}

export async function getSingleSpecie(data){
    try{
        const especie = await Especie.findById(data).select('name classification designation average_height average_lifespan eye_colors hair_colors skin_colors language homeworld');
        return especie
    }catch(error){
        console.error("Error al consultar especie ", error);
    }
}

export async function getSpecieForCharacters(){
    try{
        const especie = await Especie.find({}, '_id name')
        return especie
    }catch(error){
        console.error("Error al consultar especie ", error);
    }
}

export async function findDuplicatesSpecie(data){
    try{
        const especie = await Especie.find({
            name:data.name,
            classification: data.classification,
            designation: data.designation,
            average_height: data.average_height,
            average_lifespan: data.average_lifespan,
            eye_colors: data.eye_colors,
            hair_colors: data.hair_colors,
            skin_colors: data.skin_colors,
            language: data.language,
            homeworld: data.homeworld,
            _id: { $ne: data._id }
        })
        return especie
    }catch(error){
        console.error("Error encontrando duplicados de especie ", error)
    }
}

export async function dropSpecie(id){
    try{
        const deleted = await Especie.findByIdAndDelete(id)
        if(deleted){
            return {message:"Borrado con éxito"}
        }
        return null
    } catch(error){
        console.error("Error al borrar la especie ", error)
    }
}