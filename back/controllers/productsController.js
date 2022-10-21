const { json } = require("express")
const producto = require("../models/productos")// importar un esquema
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url));   //importar un esquema con fecth

//ver la lista de productos
    exports.getProducts=async (req,res,next) =>{
        const productos= await producto.find();

        if(!productos){
            return res.status(404).json({
                success:false,
                error:true
            })
        }
        res.status(200).json({
            success:true,
            cantidad: productos.length,
            //message:"en esta ruta ud va a poder ver todos los productos ",
            productos
        })
    }
    
//ver Producto por ID  ver consulta de objeto por id aync para que espre la devolucion de la promesa o peticion
    exports.getProductsById = async(req, res, next)=>{
        const product = await producto.findById(req.params.id) // busca el producto or id
        if (!product){ // si la contante no encontronada devuelve sms
            return res.status(404).json({
                success:false,
                message:"No encontramos ese Producto",
                error: true
            })
            
        }
        // si no encontro devuelve mensaje
        res.status(200).json({
            success:false,
            message:"Aqui debajo encuentras informacion sobre tu producto: ",
            product
            })
    }

//Update un producto

exports.updateProduct = async(req,res,next)=>{
    let product = await producto.findById(req.params.id) //variable de tipo modficable
        if (!product){ //verifco que el obejto no existe para finalizar el rpoceso
                return res.status(404).json({
                success:false,
                message:"No encontramos ese Producto"
            })
            
        }
        //si elobejto si exist, ejecito la actualizacion
        product= await producto.findByIdAndUpdate(req.params.id, req.body, {
            new:true,// valido los atributos nuevos o actualizados
            runValidators:true
        });
        //respondo Ok si el producto se actualizó
        res.status(200).json({
            success:true,
            message:"Producto actualizado correctamente",
            product
        })
    
}

//eliminar un producto

exports.deleteProduct = async(req,res,next)=>{
    const product = await producto.findById(req.params.id) //variable de tipo modficable
        if (!product){ //verifco que el obejto no existe para finalizar el rpoceso
                return res.status(404).json({ // si el obejto no existe, return termna el metodo
                success:false,
                message:"No encontramos ese Producto"
            })
            
        }
        await product.remove();//eliminamos el proceso
        res.status(200).json({
            success:true,
            message:"Producto eliminado correctamente"
        })
}
//crear nuevo producto /api/productos
exports.newProduct= async (req, res, next)=>{
    //Esperar hasta que sea cree el producto
    const product = await producto.create(req.body)
res.status(201).json({
    sucess:true,
    product
})

}
//HABLEMOS DE FETCH
//Ver todos los productos
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}

//verProductos(); //LLamamos al metodo creado para probar la consulta

//Ver por id
function verProductoPorID(id){
    fetch('http://localhost:4000/api/producto/'+id)
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}


//verProductoPorID('63456f5fcacf9e690afaec27'); //Probamos el metodo con un id
