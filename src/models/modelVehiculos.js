import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const vehiculoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required:true
    },
    vehicle_class:{
        type: String
    },
    length:{
        type: String
    },
    passengers:{
        type:String
    },
    max_atmosphering_speed:{
        type: String
    },
    cargo_capacity:{
        type:String
    },
    consumables:{
        type:String
    },
    url:{
        type:String
    }
},{
    timestamps: true
});
vehiculoSchema.plugin(mongoosePaginate)
export const Vehiculo = mongoose.model('Vehiculo',vehiculoSchema);