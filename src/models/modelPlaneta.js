import mongoose from "mongoose";

export const planetaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    diameter:{
        type: String,
    },
    rotation_period:{
        type:String
    },
    orbital_period:{
        type:String
    },
    gravity:{
        type:String
    },
    population:{
        type:String
    },
    climate:{
        type:String
    },
    terrain:{
        type:String
    },
    surface_water:{
        type:String
    },
    api_id:{
        type:String
    }
    
},{
    timestamps: true
});

export const Planeta = mongoose.model('Planeta', planetaSchema);