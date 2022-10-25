//esquema de una entidad
const mongoose= require("mongoose")

//esquema del aplicativo min 6:50
const productosSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:[true,"Por favor registra el nombre del producto."],
        trim:true,
        maxLength:[120,"El nombre del producto no debe exceder los 120 caracteres."]
    },

    precio:{
        type: Number,
        required:[true, "Por favor registr el precio del producto"],
        maxLength:[8,"El precio del producto no puede estar por encima de 99'999.999"],
        default:0.0
    },
    descripcion:{
        type:String,
        required:[true,"Por favor registre una descripcion para el producto"]
    },

    calificacion:{
        type: Number,
        default: 0
    },
    imagen:[
        //arreglo para varias imgnes
        {
            public_id:{
                type:String,
                required: true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    categoria:{
        type:String,
        required:[true, "Por favor seleccione la categoria del producto."],
        enum:{ // lista de categoria de los productos que se van a vender
            values:[
                "Alimento seco",
                "Alimento humedo",
                "Accesorios",
                "Cuidado e Higine",
                "Medicamentos",
                "Snacks",
                "Juguetes"
            ]
        }
    },
    vendedor:{
        type:String,
        required:[true,"Por favor registre el vendedor del producto"]
    },

    inventario:{
        type: Number,
        required:[ true, "Por favor registre eñ stock del producto"],
        maxLength:[5, "Cantidad maxima del producto no puede sobrepasar 99999"],
        default:0
    },
    numCalificaciones:{
        type:Number,
        default:0
    },
    opiniones:[
        {
            nombreCliente:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comentario:{
                type:String,
                required:true
            }
        }
    ],
    fechaCreacion:{
        type:Date,
        default:Date.now  //registrar la fecha actual 
    }

})
//se exporta como un modelo tipo mongoose que se va llamar productos del esqueam produtos exqeuma min 7:36
module.exports=mongoose.model("productos",productosSchema)