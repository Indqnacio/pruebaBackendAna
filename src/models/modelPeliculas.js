import mongoose, { mongo } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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
peliculaSchema.plugin(mongoosePaginate)
export const Pelicula = mongoose.model('Pelicula', peliculaSchema)