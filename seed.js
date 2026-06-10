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

export async function seedDB(){
    let flag=false
    try{

        flag = await Pelicula.findOne({limit:1})
        if(!flag){
            console.log("RECOLECTANDO INFO DE PELICULAS...")
            const data_peliculas = await axios.get(process.env.API_PELICULAS)
            console.log("PELICULAS OBTENIDA... ")

            console.log("Insertando peliculas")
            await Pelicula.insertMany(data_peliculas.data);
            console.log("Peliculas insertadas correctamente ")
        }

        
        flag = await Personaje.findOne({limit:1})
        if(!flag){
            console.log("RECOLECTANDO INFO DE PERSONAJES...")
            const data_personajes = await axios.get(process.env.API_PERSONAJES)
            console.log("PERSONAJES OBTENIDOS... ")

            console.log("Insertando personajes")
            await Personaje.insertMany(data_personajes.data);
            console.log("Personajes insertados correctamente ")
        }
        
        flag = await Especie.findOne({limit:1})
        if(!flag){
             console.log("RECOLECTANDO INFO DE ESPECIES...")
            const data_especies = await axios.get(process.env.API_ESPECIES)
            console.log("ESPECIES OBTENIDAS ")

            console.log("Insertando especies")
            await Especie.insertMany(data_especies.data);
            console.log("Especies insertadas correctamente ")
        }

       flag = await Nave.findOne({limit:1})
       if(!flag) {

            console.log("RECOLECTANDO INFO DE NAVES...")
            const data_naves = await axios.get(process.env.API_NAVES)
            console.log("NAVES OBTENIDAS ")

            console.log("Insertando naves")
            await Nave.insertMany(data_naves.data);
            console.log("naves insertadas correctamente ")
       }

       flag = await Planeta.findOne({limit:1})
       if(!flag){
             console.log("RECOLECTANDO INFO DE PLANETAS...")
        const data_planetas = await axios.get(process.env.API_PLANETAS)
        console.log("PLANETAS OBTENIDOS ")

        console.log("Insertando planetas")
        await Planeta.insertMany(data_planetas.data);
        console.log("planetas insertados correctamente ")
       }

       flag = await Vehiculo.findOne({limit:1})
       if(!flag){
            console.log("RECOLECTANDO INFO DE VEHICULOS...")
            const data_vehiculos = await axios.get(process.env.API_VEHICULOS)
            console.log("VEHICULOS OBTENIDOS ")

            console.log("Insertando vehiculos")
            await Vehiculo.insertMany(data_vehiculos.data);
            console.log("vehiculos insertados correctamente ")
       }
       console.log("Todo registrado")
    } catch (error){
        console.error("Fallo al insertar ", error);
    }
}