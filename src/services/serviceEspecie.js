import { Especie } from "../models/modelEspecie.js"

export async function crearEspecie(data){
    try{
        const newEspecie = await Especie.create(data);
        return newEspecie
    }catch(error){
        console.error("Error al crear especie ", error);
    }
}

export async function actuEspecie(data){
    try{
        const especie = await Especie.findById(data);
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

export async function getListaEspecie(){
    try{
        const lista_especies = await Especie.find();
        return lista_especies
    }catch(error){
        console.error("Error al consultar lista de especies ", error)
    }
}

export async function getSingleEspecie(data){
    try{
        const especie = await Especie.findById(data._id)
        return especie
    }catch(error){
        console.error("Error al consultar especie ", error);
    }
}

export async function getEsp_Perso(){
    try{
        const especie = await Especie.find({}, '_id name')
        return especie
    }catch(error){
        console.error("Error al consultar especie ", error);
    }
}

export async function findDuplicates_Especie(data){
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
            homeworld: data.homeworld
        })
        return especie
    }catch(error){
        console.error("Error encontrando duplicados de especie ", error)
    }
}
