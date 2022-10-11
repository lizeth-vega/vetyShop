const { json } = require("express")
const producto = require("../models/productos")// importar un esquema

//ver la lista de productos
exports.getProducts =(req,res,next) =>{
    res.status(200).json({
        sucess:true,
        message:"en esta ruta ud va a poder ver todos los productos "
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

