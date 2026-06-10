import mongoose from "mongoose";

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
    }
},{
    timestamps: true
})
export const Personaje = mongoose.model('Personaje', personajeSchema)