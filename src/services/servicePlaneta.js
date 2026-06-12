import { Planeta } from "../models/modelPlaneta.js";

export async function createPlanet(data){
    try{
        const newPlaneta = await Planeta.create(data);
        return newPlaneta
    }catch(error){
        console.log("Error al crear planeta ", error)
    }
}

export async function updatePlanet(data){
    try{
        const planeta = await Planeta.findById(data.id);
        if(planeta){
            planeta.name =  data.name||planeta.name;
           planeta.diameter = data.diameter||planeta.diameter;
           planeta.rotation_period = data.rotation_period||planeta.rotation_period;
           planeta.orbital_period = data.orbital_period||planeta.orbital_period
           planeta.gravity = data.gravity||planeta.gravity
           planeta.population=data.population||planeta.population
           planeta.climate=data.climate||planeta.climate
           planeta.terrain=data.terrain||planeta.terrain
           planeta.surface_water=data.surface_water||planeta.surface_water
           await planeta.save();
        }
        return planeta
    }catch(error){
        console.error("Error al actualizar planeta", error)
    }
}

export async function dropPlanet(data){
    try{
        const deleted = await Planeta.findByIdAndDelete(data)
        if(deleted){
            return {message:"Borrado con éxito"}
        }
        return null
    }catch(error){
        console.error("Error al borrar planeta ", error)
    }
}

export async function getAllPlanets(page, limit){
    try{
        const select='_id name diameter rotation_period orbital_period gravity population climate terrain surface_water'
        const options={select:select,page: page, limit:limit, lean:true, }
        const planetas = await Planeta.paginate({}, options);
        return planetas
    } catch(error){
        console.error("Error al obtener lista de planetas ", error);
    }
}

export async function getPlanet(data){
    try{
        const planeta = await Planeta.findById(data).select('_id name diameter rotation_period orbital_period gravity population climate terrain surface_water');
        return planeta
    } catch(error){
        console.error("Error al obtener el planeta ", error);
    }
}

export async function getPlanetsForCharacters(){
    try{
        const planetas = await Planeta.find({},'_id name');
        return planetas
    } catch(error){
        console.error("Error al obtener planetas ", error);
    }
}

export async function findDuplicatesPlanets(data){
    try{
        const planeta = await Planeta.find({
            name:data.name,
            diameter: data.diameter,
            rotation_period: data.rotation_period,
            orbital_period: data.orbital_period,
            gravity: data.gravity,
            population: data.population,
            climate: data.climate,
            terrain: data.terrain,
            surface_water: data.surface_water
        })
        return planeta
    }catch(error){
        console.error("Error encontrando duplicados de planetas ", error)
    }
}