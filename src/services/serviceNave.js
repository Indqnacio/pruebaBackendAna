import {Nave} from '../models/modelNave.js'

export async function createStarship(data){
    try{
        const newNave = await Nave.create(data);
        return newNave
    }catch(error){
        console.error("Error al crear nave ", error)
    }
}

export async function updateStarship(data){
    try{
        const nave = await Nave.findById(data._id)
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
            await nave.save();
        }
        return nave
    } catch(error){
        console.error("Error al actualizar nave ", error);
    }
}

export async function dropStarship(data){
    try{
        const deleted = await Nave.findByIdAndDelete(data)
        if(deleted){
            return {message:"Borrado con éxito"}
        }
        return null
    } catch(error){
        console.error("Error al borrar nave ", error)
    }
}

export async function getAllStarships(page, limit){
    try{
        const select = 'name model starship_class length passengers max_atmosphering_speed hyperdrive_rating MGLT cargo_capacity consumables'
        const options = {select:select,page: page, limit:limit, lean:true, }
        const lista_naves = await Nave.paginate({}, options);
        return lista_naves
    }catch(error){
        console.error("Error al consultar lista de naves ", error)
    }
}
export async function getStarshipsForCharacters(){
    try{
        const nave = await Nave.find({}, '_id name')
        return nave
    }catch(error){
        console.error("Error al consultar naves ", error);
    }
}

export async function getSingleStarship(data){
    try{
        const nave = await Nave.findById(data).select('name model starship_class length passengers max_atmosphering_speed hyperdrive_rating MGLT cargo_capacity consumables');
        console.log("nave", nave)
        return nave
    }catch(error){
        console.error("Error al consultar nave ", error);
    }
}
export async function findDuplicatesStarships(data){
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