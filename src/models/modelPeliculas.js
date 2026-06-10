import mongoose from "mongoose";

export const peliculaSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:[true, "El nombre es obligatorio"]},
    director:{
        type:String,
        required:[true, "El director es obligatorio"]},
    productor:{
        type:String,
        required:[true, "El productor es obligatorio"]},
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});