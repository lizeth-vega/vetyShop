const catchAsyncErrors = require("../middlerware/catchAsyncErrors");
const producto = require("../models/productos")// importar un esquema
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));   //importar un esquema con fecth

//ver la lista de productos
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const productos = await producto.find();
    if (!productos) {
        return next(new ErrorHandler("Informacion no encontrado", 404))
    }
    res.status(200).json({
        success: true,
        cantidad: productos.length,
        //message:"en esta ruta ud va a poder ver todos los productos ",
        productos
    })
})

//ver Producto por ID  ver consulta de objeto por id aync para que espre la devolucion de la promesa o peticion

exports.getProductsById = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    res.status(200).json({
        success: true,
        message: "Aqui debajo encuentras información sobre tu producto: ",
        product
    })
})
//Update un producto

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await producto.findById(req.params.id) //variable de tipo modficable
    if (!product) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    //si elobejto si exist, ejecito la actualizacion
    product = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,// valido los atributos nuevos o actualizados
        runValidators: true
    });
    //respondo Ok si el producto se actualizó
    res.status(200).json({
        success: true,
        message: "Producto actualizado correctamente",
        product
    })

})

//eliminar un producto

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.params.id) //variable de tipo modficable
    if (!product) {
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    await product.remove();//eliminamos el proceso
    res.status(200).json({
        success: true,
        message: "Producto eliminado correctamente"
    })
})
//crear un  nuevo producto /api/productos/
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id; //primero se busco  el usuario y des se registra o crea el producto
    const product = await producto.create(req.body);
    //Esperar hasta que sea cree el producto
    res.status(201).json({
        success: true,
        product
    })
})

//HABLEMOS DE FETCH
//Ver todos los productos
function verProductos() {
    fetch('http://localhost:4000/api/productos')
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err))
}
//verProductos(); //LLamamos al metodo creado para probar la consulta

//Ver por id
function verProductoPorID(id) {
    fetch('http://localhost:4000/api/producto/' + id)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err))
}


//verProductoPorID('63456f5fcacf9e690afaec27'); //Probamos el metodo con un id
