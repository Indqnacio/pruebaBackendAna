import mongoose, { Schema } from "mongoose";

export const especieSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true},
    classification:{
        type: String},
    designation:{
        type: String},
    average_height:{
        type: String},
    average_lifespan:{
        type:String
    },
    eye_colors:{
        type:String
    },
    hair_colors:{
        type:String
    },
    skin_colors:{
        type:String
    },
    language:{
        type:String
    },
    homeworld:{
        type: Schema.Types.ObjectId,
        ref:'Planeta',
        required: true
    }
},{
    timestamps: true
});

export const Especie = mongoose.model('Especie', especieSchema);