import mongoose from "mongoose";

export const planetaSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    diametro:{
        type: String,
    },
    periodo_rotacion:{
        type:String
    },
    periodo_orbital:{
        type:String
    },
    gravedad:{
        type:String
    },
    poblacion:{
        type:String
    },
    clima:{
        type:String
    },
    terreno:{
        type:String
    },
    porcentaje_agua:{
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
    
});