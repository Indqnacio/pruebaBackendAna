import mongoose from "mongoose";

export const especieSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required:true},
    clasificacion:{
        type: String},
    designacion:{
        type: String},
    promedio_altura:{
        type: String},
    promedio_vida:{
        type:String
    },
    color_ojos:{
        type:String
    },
    color_cabello:{
        type:String
    },
    color_piel:{
        type:String
    },
    lenguaje:{
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