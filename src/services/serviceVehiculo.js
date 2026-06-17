import {Vehiculo} from '../models/modelVehiculos.js'

export async function createVehicle(data){
    try{
        const newVehi = await Vehiculo.create(data);
        return newVehi
    }catch(error){
        console.error("Error al crear vehiculo ", error)
    }
}

export async function updateVehicle(data){
    try{
        const vehi = await Vehiculo.findById(data._id)
        if(vehi){
            vehi.name=data.name||vehi.name
            vehi.model=data.model||vehi.model
            vehi.vehicle_class=data.vehicle_class||vehi.vehicle_class
            vehi.length=data.length||vehi.length
            vehi.passengers=data.passengers||vehi.passengers
            vehi.max_atmosphering_speed=data.max_atmosphering_speed||vehi.max_atmosphering_speed
            vehi.cargo_capacity=data.cargo_capacity||vehi.cargo_capacity
            vehi.consumables=data.consumables||vehi.consumables
            await vehi.save();
        }
        return vehi
    } catch(error){
        console.error("Error al actualizar nave ", error);
    }
}

export async function dropVehicle(data){
    try{
        const deleted =  await Vehiculo.findByIdAndDelete(data)
        if(deleted){
            return {message:"Borrado con éxito"}
        }
        return null
    } catch(error){
        console.error("Error al borrar vehiculo ", error)
    }
}

export async function getAllVehicles(page,limit){
    try{
        const select='name model vehicle_class length passengers max_atmosphering_speed cargo_capacity consumables'
        const options = {select:select,page: page, limit:limit, lean:true, }
        const lista_vehiculos = await Vehiculo.paginate({},options);
        return lista_vehiculos
    }catch(error){
        console.error("Error al consultar lista de vehiculos ", error)
    }
}
export async function getVehiclesForCharacters(){
    try{
        const vehi = await Vehiculo.find({}, '_id name')
        return vehi
    }catch(error){
        console.error("Error al consultar vehiculos ", error);
    }
}

export async function getSingleVehicle(data){
    try{
        const vehi = await Vehiculo.findById(data).select('name model vehicle_class length passengers max_atmosphering_speed cargo_capacity consumables')
        return vehi
    }catch(error){
        console.error("Error al consultar nave ", error);
    }
}
export async function findDuplicatesVehicle(data){
    try{
        const vehiculo = await Vehiculo.find({
            name:data.name,
            model: data.model,
            vehicle_class: data.vehicle_class,
            length: data.length,
            passengers: data.passengers,
            max_atmosphering_speed: data.max_atmosphering_speed,
            cargo_capacity: data.cargo_capacity,
            consumables: data.consumables,
            _id: { $ne: data._id }
        })
        return vehiculo
    }catch(error){
        console.error("Error encontrando duplicados de vehículos ", error)
    }
}