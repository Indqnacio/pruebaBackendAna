import {findDuplicatesVehicle, createVehicle, updateVehicle, getAllVehicles, getVehiclesForCharacters, getSingleVehicle, dropVehicle} from "../services/serviceVehiculo.js";

export async function postVehicle (req, res){
   const data = req.body
    const duplicado = await findDuplicatesVehicle(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"El vehículo ya está registrado"})
    }
    const vehiculo = await createVehicle(data)
    return res.status(200).json(vehiculo)
}

export async function getVehicles (req, res){
    const page = parseInt(req.query.page, 10) 
    const limit = parseInt(req.query.limit,10) 
    const vehiculos = await getAllVehicles(page,limit);
    if(!vehiculos){
        return res.status(404).json({error: 'No se encontraron vehículos'})
    }
    return res.status(200).json(vehiculos)
}

export async function getVehicle (req, res){
    const {id} = req.body
   // console.log(id)
    const vehiculo = await getSingleVehicle(id);
   // console.log("peliculas ", peliculas)
    if(!vehiculo){
        return res.status(404).json({error: 'No se encontró el vehículo'})
    }
    return res.status(200).json(vehiculo)
}

export async function getVehiclesChracters (req, res){
    
    const vehiculos = await getVehiclesForCharacters();
    if(!vehiculos){
        return res.status(404).json({error: 'No se encontraron vehículos'})
    }
    return res.status(200).json(vehiculos)
}

export async function putVehicle(req, res){
    const data = req.body
    const duplicado = await findDuplicatesVehicle(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"El vehículo ya está registrado"})
    }
    const existente = await getSingleVehicle(data.id)
    if(!existente||existente==null){
        return res.status(500).json({message:"No existe este vehículo para actualizar"})
    }
    const vahiculo = await updateVehicle(data)
    console.log(vahiculo)
    return res.status(200).json(vahiculo)
}

export async function deleteVehicle(req, res){
    const {id} = req.body
    const borrar = await dropVehicle(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con éxito"})
    }
        return res.status(500).json({message:"El vehículo no se encuentra o ya fue borrado"})
}