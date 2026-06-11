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
    let flag=false
    try{

        console.log("RECOLECTANDO INFO DE PLANETAS...")
        const data_planetas = await axios.get(process.env.API_PLANETAS)
        data_planetas.data.forEach(planeta=>{
            const aux = extraerID(planeta.url);
            planeta.api_id = aux[aux.length-1];
        })
        console.log("PLANETAS OBTENIDOS ")
        console.log("Insertando planetas")
        await Planeta.insertMany(data_planetas.data);
        console.log("planetas insertados correctamente ")
      /*  const planetas_DB = await Planeta.find({})
       var planetasDict = {}
        planetas_DB.map(planeta_db => {
            planetasDict[planeta_db.api_id] = _id 
        });]*/

        console.log("RECOLECTANDO INFO DE NAVES...")
        const data_naves = await axios.get(process.env.API_NAVES)
        data_naves.data.forEach(nave=>{
            const aux = extraerID(nave.url);
            nave.api_id = aux[aux.length-1];
        })
        console.log("NAVES OBTENIDAS ")
        console.log("Insertando naves")
        await Nave.insertMany(data_naves.data);
        console.log("naves insertadas correctamente ")
        /*const naves_DB = await Nave.find({}, {_id, api_id})
        var navesDict = {}
        naves_DB.map(nave_db => {
            navesDict[nave_db.api_id] = _id 
        });*/

        console.log("RECOLECTANDO INFO DE PELICULAS...")
        const data_peliculas = await axios.get(process.env.API_PELICULAS)
          data_peliculas.data.forEach(peli=>{
            const aux = extraerID(peli.url);
            peli.api_id = aux[aux.length-1];
        })
        console.log("PELICULAS OBTENIDA... ")
        console.log("Insertando peliculas")
        await Pelicula.insertMany(data_peliculas.data);
        console.log("Peliculas insertadas correctamente ")
        /*const peliculas_DB = await Pelicula.find({}, {_id, api_id})
       var peliculasDict = {}
        peliculas_DB.map(pelicula_db => {
            peliculasDict[pelicula_db.api_id] = _id
        });*/

        console.log("RECOLECTANDO INFO DE VEHICULOS...")
        const data_vehiculos = await axios.get(process.env.API_VEHICULOS)
        data_vehiculos.data.forEach(vehiculo=>{
            const aux = extraerID(vehiculo.url);
            vehiculo.api_id = aux[aux.length-1];
        })
        console.log("VEHICULOS OBTENIDOS ")
        console.log("Insertando vehiculos")
        await Vehiculo.insertMany(data_vehiculos.data);
        console.log("vehiculos insertados correctamente ")

        console.log("RECOLECTANDO INFO DE ESPECIES...")
        const data_especies = await axios.get(process.env.API_ESPECIES)
        console.log("ESPECIES OBTENIDAS ")
        const data_especies_promise = await Promise.all(        data_especies.data.map(async (especie)=>{
            const planeta_origen = await axios.get(especie.url);
            //console.log("planeta de la api ", planeta_origen)
            //console.log()
            const planeta_db = await Planeta.find({name: planeta_origen.name})
            //console.log("planeta ",planeta_db)
            especie.homeworld=planeta_db._id
            //console.log("especie.homeworld ", especie.homeworld)
        }))


        console.log("Insertando especies")
        await Especie.insertMany(data_especies.data);
        console.log("Especies insertadas correctamente ")

        console.log("RECOLECTANDO INFO DE PERSONAJES...")
        const data_personajes = await axios.get(process.env.API_PERSONAJES)
        console.log("PERSONAJES OBTENIDOS... ")
        const data_personajes_promise = await Promise.all(
            data_personajes.data.map(async (personaje)=>{
            //const aux= extraerID(personaje.homeworld);
            //personaje.homeworld = planetasDict[personaje.homeworld]
            const planeta_origen = await axios.get(personaje.url);
            const planeta_db = await Planeta.find({name: planeta_origen.name})
            personaje.homeworld=planeta_db._id

            if(personaje.vehicles.length>0 || personaje.vehicles !== null){
               let v=[]
               const vehiculos_promise = await Promise.all(
                personaje.vehicles.map(async (vehiculo) =>{
                const vehiculo_propio = await axios.get(vehiculo)
                const vehiculo_db = await Vehiculo.find({name: vehiculo_propio.name})
                v.push(vehiculo_db._id)
            }))
                
            personaje.vehicles = v;
        }

            if(personaje.starships.length>0){
                let s=[]
                const starships_promise = await Promise.all(
                    personaje.starships.map(async (nave)=>{
                    const nave_propia =await axios.get(nave)
                    const nave_DB = await Nave.find({name: nave_propia.name})
                    s.push(nave_DB._id)
                })
                )
                personaje.starships=s;
            }
            

            if(personaje.films.length>0){
                let f=[]
                const films_promise = await Promise.all(
                    personaje.films.map(async (peli) =>{
                    const peli_propia = await axios.get(peli)
                    const peli_DB = await Pelicula.find({title:peli_propia.name})
                    f.push(peli_DB._id)
                }))
                personaje.films=f;
            }
            
 
            if(personaje.species.lenght>0){
                let sp=[]
                const species_promise = await Promise.all(
                    personaje.species.map(async (espe) => {
                    const espe_propia = await axios.get(espe)
                    const espe_DB = await Especie.find({name: espe_propia.name})
                    console.log("id especie ", espe_DB._id)
                    sp.push(espe_DB._id)
                }))
                personaje.species=sp;
                console.log(personaje.species)
            }
            
        })
        )
        
        console.log("Insertando personajes")
        console.log(data_personajes.data)
        await Personaje.insertMany(data_personajes.data);
        console.log("Personajes insertados correctamente ")


       console.log("Todo registrado")
    } catch (error){
        console.error("Fallo al insertar ", error);
    }
}