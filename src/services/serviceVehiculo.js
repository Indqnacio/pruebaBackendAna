import {Vehiculo} from '../models/modelVehiculos.js'

export async function crearVehiculo(data){
    try{
        const newVehi = await Vehiculo.create(data);
        return newVehi
    }catch(error){
        console.error("Error al crear vehiculo ", error)
    }
}

export async function actuVehi(data){
    try{
        const vehi = await Vehiculo.findById(data._id)
        if(vehi){
            vehi.name=data.name||vehi.name
            vehi.model=data.model||vehi.model
            //nave.starship_class=data.starship_class||nave.starship_class
            vehi.vehicle_class=data.vehicle_class||vehi.vehicle_class
            vehi.length=data.length||vehi.length
            vehi.passengers=data.passengers||vehi.passengers
            vehi.max_atmosphering_speed=data.max_atmosphering_speed||vehi.max_atmosphering_speed
            //nave.hyperdrive_rating=data.hyperdrive_rating||nave.hyperdrive_rating
            //nave.MGLT=data.MGLT||nave.MGLT
            vehi.cargo_capacity=data.cargo_capacity||vehi.cargo_capacity
            vehi.consumables=data.consumables||vehi.consumables
            return vehi
        }
        
    } catch(error){
        console.error("Error al actualizar nave ", error);
    }
}

export default function borrVehi(data){
    try{
        await Vehiculo.findByIdAndDelete(data._id)
        return {message:"Borrado con exito"}
    } catch(error){
        console.error("Error al borrar vehiculo ", error)
    }
}

export async function getListaVehi(){
    try{
        const lista_vehiculos = await Vehiculo.find();
        return lista_vehiculos
    }catch(error){
        console.error("Error al consultar lista de vehiculos ", error)
    }
}
export async function getVehi_Perso(){
    try{
        const vehi = await Vehiculo.find({}, '_id name')
        return vehi
    }catch(error){
        console.error("Error al consultar vehiculos ", error);
    }
}

export async function getSingleVehi(data){
    try{
        const vehi = await Vehiculo.findById(data._id)
        return vehi
    }catch(error){
        console.error("Error al consultar nave ", error);
    }
}