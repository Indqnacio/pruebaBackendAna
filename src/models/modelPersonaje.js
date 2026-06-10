import mongoose from "mongoose";

export const personajeSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required:true},
    fecha_nac:{
        type: String},
    color_ojos:{
        type: String},
    genero:{
        type:String
    },
    color_cabello:{
        type:String
    },
    altura:{
        type:String
    },
    masa:{
        type:String
    },
    color_piel:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})