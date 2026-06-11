import mongoose from "mongoose";
import { Schema } from "mongoose";
export const personajeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true},
    birth_year:{
        type: String},
    eye_color:{
        type: String},
    gender:{
        type:String
    },
    hair_color:{
        type:String
    },
    height:{
        type:String
    },
    mass:{
        type:String
    },
    skin_color:{
        type:String
    },
    films:{
        type: Schema.Types.ObjectId,
        ref:'Pelicula',
        required: true
    },
    homeworld:{
        type: Schema.Types.ObjectId,
        ref:'Planeta',
        required: false
    },
    species:{
        type: Schema.Types.ObjectId,
        ref:'Especie',
        required: false
    },
    starships:{
        type: Schema.Types.ObjectId,
        ref:'Nave',
        required: false
    },
    vehicles:{
        type: Schema.Types.ObjectId,
        ref:'Vehiculo',
        required: false
    }
},{
    timestamps: true
})
export const Personaje = mongoose.model('Personaje', personajeSchema)