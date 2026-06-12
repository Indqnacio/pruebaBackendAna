import mongoose from "mongoose";
import express, { json } from'express';
import { Pelicula } from "./src/models/modelPeliculas.js";
import {Personaje} from "./src/models/modelPersonaje.js";
import { Especie } from "./src/models/modelEspecie.js";
import { Nave } from "./src/models/modelNave.js";
import {Planeta} from "./src/models/modelPlaneta.js";
import {Vehiculo} from "./src/models/modelVehiculos.js";
import dotenv from 'dotenv';
import axios from "axios";

dotenv.config();

function extraerID(url){
    if(!url || URL === null){
        return null;
    }
    const id = url.split("/");
    
    return id;
}

function buscar(url){
    const data = axios.get(url)
    return data;
}

export async function seedDB(){
    //let flag=false
    try{
        const countPlanets = await Planeta.countDocuments();
        if(countPlanets===0){
            console.log("RECOLECTANDO INFO DE PLANETAS...")
            const data_planetas = await axios.get(process.env.API_PLANETAS)
            console.log("PLANETAS OBTENIDOS ")
            console.log("Insertando planetas")
            await Planeta.insertMany(data_planetas.data);
            console.log("planetas insertados correctamente ")
        }
       else{
        console.log("Planetas ya registrados")
       }

       const countStarships = await Nave.countDocuments();
       if(countStarships===0){
        console.log("RECOLECTANDO INFO DE NAVES...")
        const data_naves = await axios.get(process.env.API_NAVES)
        console.log("NAVES OBTENIDAS ")
        console.log("Insertando naves")
        await Nave.insertMany(data_naves.data);
        console.log("naves insertadas correctamente ")

       }
       else{
        console.log("Naves ya registradas")
       }

       const countMovies = await Pelicula.countDocuments();
       if(countMovies === 0){
        console.log("RECOLECTANDO INFO DE PELICULAS...")
        const data_peliculas = await axios.get(process.env.API_PELICULAS)
        console.log("PELICULAS OBTENIDA... ")
        console.log("Insertando peliculas")
        await Pelicula.insertMany(data_peliculas.data);
        console.log("Peliculas insertadas correctamente ")
       }
       else{
        console.log("Películas ya registradas")
       }

       const countVehicles = await Vehiculo.countDocuments();
       if(countVehicles === 0){ 
            console.log("RECOLECTANDO INFO DE VEHICULOS...")
            const data_vehiculos = await axios.get(process.env.API_VEHICULOS)
            console.log("VEHICULOS OBTENIDOS ")
            console.log("Insertando vehiculos")
            await Vehiculo.insertMany(data_vehiculos.data);
            console.log("vehiculos insertados correctamente ")
       } 
       else{
        console.log("Vehículos ya registrados")
       }

       const countSpecies = await Especie.countDocuments();
       if(countSpecies === 0){
            console.log("RECOLECTANDO INFO DE ESPECIES...")
            const data_especies = await axios.get(process.env.API_ESPECIES)
            console.log("ESPECIES OBTENIDAS ")
            relacionarEspecies(data_especies.data);
       }else{
        console.log("Especies ya registradas")
       }
       
       const countCharacters = await Personaje.countDocuments();
       if(countCharacters === 0){
            console.log("RECOLECTANDO INFO DE PERSONAJES...")
            const data_personajes = await axios.get(process.env.API_PERSONAJES)
            console.log("PERSONAJES OBTENIDOS... ")
            relacionarPersonajes(data_personajes.data)   
       }else{
        console.log("Personajes ya registrados")
       }
           
       console.log("Todo registrado")
    } catch (error){
        console.error("Fallo al insertar ", error);
    }
}
async function relacionarEspecies(especies_api){
    const todos_planetas = await Planeta.find({}, '_id url').lean()
    const planetas_dict={}
    todos_planetas.forEach((planeta)=>{
        planetas_dict[planeta.url] = planeta._id
    })
    
    const especies_formateadas=especies_api.map((especie)=>{
        return{
            name: especie.name,
            classification: especie.classification,
            designation: especie.designation,
            average_height: especie.average_height,
            average_lifespan: especie.average_lifespan,
            eye_colors: especie.eye_colors,
            hair_colors: especie.hair_colors,
            skin_colors: especie.skin_colors,
            language: especie.language,
            homeworld: planetas_dict[especie.homeworld]
        }
    })
    await Especie.insertMany(especies_formateadas);
}
async function relacionarPersonajes(personajes_api){
    const todos_vehiculos = await Vehiculo.find({}, '_id url').lean()
    const vehiculo_dict = {}
    todos_vehiculos.forEach((vehiculo) =>{
        vehiculo_dict[vehiculo.url] = vehiculo._id
    })

    const todos_naves = await Nave.find({}, '_id url').lean()
    const nave_dict = {}
    todos_naves.forEach((nave)=>{
        nave_dict[nave.url] = nave._id
    })

    const todas_especies = await Especie.find({}, '_id url').lean()
    const especie_dict={}
    todas_especies.forEach((especie) => {
        especie_dict[especie.url] = especie._id
    })

    const todas_pelis = await Pelicula.find({}, '_id url').lean()
    const pelis_dict = {}
    todas_pelis.forEach((peli) =>{
        pelis_dict[peli.url] = peli._id
    })

    const todos_planetas = await Planeta.find({}, '_id url').lean()
    const planetas_dict={}
    todos_planetas.forEach((planeta) =>{
        planetas_dict[planeta.url] = planeta._id
    })

    const personajes_formateados=personajes_api.map((personaje)=>{
        const vehiculos_bien=[]
        const vehiculos_ids=personaje.vehicles.map((vehiculo_url) =>{
            vehiculos_bien.push(vehiculo_dict[vehiculo_url])
            return{
                vehiculos_bien
            }
        });
        const especies_bien=[]
        const especie_ids=personaje.species.map((especie_url)=>{
            especies_bien.push(especie_dict[especie_url])
            return{
                especies_bien
            }
        });
        const naves_bien=[]
        const naves_ids=personaje.starships.map((nave_url)=>{
            naves_bien.push(nave_dict[nave_url])
            return{
                naves_bien
            }
        })
        const peliculas_bien=[]
        const peliculas_ids=personaje.films.map((peli_url)=>{
            peliculas_bien.push(pelis_dict[peli_url])
            return{
                peliculas_bien
            }
        }) 
        const planeta_id = planetas_dict[personaje.url]
        return{
            name: personaje.name,
            birth_year: personaje.birth_year,
            eye_color: personaje.eye_color,
            gender: personaje.gender,
            hair_color: personaje.hair_color,
            height: personaje.height,
            mass: personaje.mass,
            skin_color: personaje.skin_color,
            films: peliculas_bien,
            homeworld: planeta_id,
            species: especies_bien,
            starships: naves_bien,
            vehicles: vehiculos_bien 
        }
    })

    await Personaje.insertMany(personajes_formateados);
}

