import {findDuplicatesVehiculo, crearVehiculo, actuVehi, getListaVehi, getVehi_Perso, getSingleVehi, borrVehi} from "../services/serviceVehiculo.js";

export async function postVehiculo (req, res){
   const data = req.body
    const duplicado = await findDuplicatesVehiculo(data)
   // console.log(duplicado)
    if(duplicado.length>0){
        return res.status(500).json({message:"el vehiculo ya esta registrado"})
    }
    const vehiculo = await crearVehiculo(data)
    return res.status(200).json(vehiculo)
}

export async function getVehiculos (req, res){
    const page = parseInt(req.query.page, 10) 
    console.log(page)
    const limit = parseInt(req.query.limit,10) 
    console.log(limit)
    const vehiculos = await getListaVehi(page,limit);
    //console.log("peliculas ", peliculas)
    if(!vehiculos){
        return res.status(404).json({error: 'NO hay vehiculos encontrados'})
    }
    return res.status(200).json(vehiculos)
}

export async function getSin_Vehi (req, res){
    const {id} = req.body
   // console.log(id)
    const vehiculo = await getSingleVehi(id);
   // console.log("peliculas ", peliculas)
    if(!vehiculo){
        return res.status(404).json({error: 'NO hay vehiculo encontradas'})
    }
    return res.status(200).json(vehiculo)
}

export async function getPerso_Vehi (req, res){
    
    const vehiculos = await getVehi_Perso();
    if(!vehiculos){
        return res.status(404).json({error: 'NO hay vehculos encontradas'})
    }
    return res.status(200).json(vehiculos)
}

export async function putVehiculos(req, res){
    const data = req.body
    const duplicado = await findDuplicatesVehiculo(data)
    if(duplicado.length>0){
        return res.status(500).json({message:"el vehiculo ya esta registrado"})
    }
    const existente = await getSingleVehi(data.id)
    console.log(existente)
    if(!existente||existente==null){
        return res.status(500).json({message:"no existe este vehiculo para actualizar"})
    }
    const vahiculo = await actuVehi(data)
    console.log(vahiculo)
    return res.status(200).json(vahiculo)
}

export async function deleVehiculo(req, res){
    const {id} = req.body
    const borrar = await borrVehi(id)
    if(borrar!==null){
        return res.status(200).json({message:"Registro borrado con exito"})
    }
        return res.status(500).json({message:"El vehiculo no se encuentra o ya fue borrado"})
}