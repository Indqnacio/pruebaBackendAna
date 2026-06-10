import mongoose from "mongoose";

export const naveSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true},
    model:{
        type:String,
        required:true},
    starship_class:{
        type:String,
    },
    length:{
        type:String
    },
    passengers:{
        type:String
    },
    max_atmosphering_speed:{
        type:String
    },
    hyperdrive_rating:{
        type:String
    },
    MGLT:{
        type:String
    },
    cargo_capacity:{
        type:String
    },
    consumables:{
        type:String
    },
},{
    timestamps: true
});
export const Nave = mongoose.model('Nave', naveSchema);