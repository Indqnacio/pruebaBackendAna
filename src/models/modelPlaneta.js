import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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
    url:{
        type:String
    }
    
},{
    timestamps: true
});
planetaSchema.plugin(mongoosePaginate)
export const Planeta = mongoose.model('Planeta', planetaSchema);