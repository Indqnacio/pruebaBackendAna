import {Nave} from '../models/modelNave.js'

export async function crearNave(data){
    try{
        const newNave = await Nave.create(data);
        return newNave
    }catch(error){
        console.error("Error al crar nave ", error)
    }
}

export async function actuNave(data){
    try{
        const nave = await Nave.findById(data.id)
        if(nave){
            nave.name=data.name||nave.name
            nave.model=data.model||nave.model
            nave.starship_class=data.starship_class||nave.starship_class
            nave.length=data.length||nave.length
            nave.passengers=data.passengers||nave.passengers
            nave.max_atmosphering_speed=data.max_atmosphering_speed||nave.max_atmosphering_speed
            nave.hyperdrive_rating=data.hyperdrive_rating||nave.hyperdrive_rating
            nave.MGLT=data.MGLT||nave.MGLT
            nave.cargo_capacity=data.cargo_capacity||nave.cargo_capacity
            nave.consumables=data.consumables||nave.consumables
            return nave
        }
        
    } catch(error){
        console.error("Error al actualizar nave ", error);
    }
}

export async function borrNave(data){
    try{
        await Nave.findByIdAndDelete(data._id)
        return {message:"Borrado con exito"}
    } catch(error){
        console.error("Error al borrar nave ", error)
    }
}

export async function getListaNave(){
    try{
        const lista_naves = await Nave.find().select('name model starship_class length passengers max_atmosphering_speed hyperdrive_rating MGLT cargo_capacity consumables');
        return lista_naves
    }catch(error){
        console.error("Error al consultar lista de naves ", error)
    }
}
export async function getNave_Perso(){
    try{
        const nave = await Nave.find({}, '_id name')
        return nave
    }catch(error){
        console.error("Error al consultar naves ", error);
    }
}

export async function getSingleNave(data){
    try{
        const nave = await Nave.findById(data._id).select('name model starship_class length passengers max_atmosphering_speed hyperdrive_rating MGLT cargo_capacity consumables');
        return nave
    }catch(error){
        console.error("Error al consultar nave ", error);
    }
}
export async function findDuplicates_Nave(data){
    try{
        const nave = await Nave.find({
            name:data.name,
            model: data.model,
            starship_class: data.starship_class,
            length: data.length,
            passengers: data.passengers,
            max_atmosphering_speed: data.max_atmosphering_speed,
            hyperdrive_rating: data.hyperdrive_rating,
            MGLT: data.MGLT,
            cargo_capacity: data.cargo_capacity,
            consumables: data.consumables
        })
        return nave
    }catch(error){
        console.error("Error encontrando duplicados de nave ", error)
    }
}