import mongoose, { mongo } from "mongoose";

export const peliculaSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true},
    director:{
        type:String,
        required:true},
    producer:{
        type:String,
        required:true},
    url:{
        type:String
    }
},{
    timestamps: true
});

export const Pelicula = mongoose.model('Pelicula', peliculaSchema)