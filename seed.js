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

    try{

        console.log("RECOLECTANDO INFO DE PELICULAS...")
        const data_peliculas = await axios.get(process.env.API_PELICULAS)
        console.log("PELICULAS OBTENIDA... ")
    
    console.log("RECOLECTANDO INFO DE PERSONAJES...")
    const data_personajes = await axios.get(process.env.API_PERSONAJES)
    console.log("PERSONAJES OBTENIDOS... ")

    console.log("RECOLECTANDO INFO DE ESPECIES...")
    const data_especies = await axios.get(process.env.API_ESPECIES)
    console.log("ESPECIES OBTENIDAS ")

    console.log("RECOLECTANDO INFO DE NAVES...")
    const data_naves = await axios.get(process.env.API_NAVES)
    console.log("NAVES OBTENIDAS ")

    console.log("RECOLECTANDO INFO DE PLANETAS...")
    const data_planetas = await axios.get(process.env.API_PLANETAS)
    console.log("PLANETAS OBTENIDOS ")

    console.log("RECOLECTANDO INFO DE VEHICULOS...")
    const data_vehiculos = await axios.get(process.env.API_VEHICULOS)
    console.log("VEHICULOS OBTENIDOS ")


        console.log("Insertando peliculas")
        await Pelicula.insertMany(data_peliculas.data);
        console.log("Peliculas insertadas correctamente ")
        
        console.log("Insertando personajes")
        await Personaje.insertMany(data_personajes.data);
        console.log("Personajes insertados correctamente ")

        console.log("Insertando especies")
        await Especie.insertMany(data_especies.data);
        console.log("Especies insertadas correctamente ")

        console.log("Insertando naves")
        await Nave.insertMany(data_naves.data);
        console.log("naves insertadas correctamente ")
        
        console.log("Insertando planetas")
        await Planeta.insertMany(data_planetas.data);
        console.log("planetas insertados correctamente ")

        console.log("Insertando vehiculos")
        await Vehiculo.insertMany(data_vehiculos.data);
        console.log("vehiculos insertados correctamente ")
    } catch (error){
        console.error("Fallo al insertar ", error);
    }
}