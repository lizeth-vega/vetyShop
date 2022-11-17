const catchAsyncErrors = require("../middlerware/catchAsyncErrors");
const producto = require("../models/productos")// importar un esquema
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));   //importar un esquema con fecth
const cloudinary = require('cloudinary')

//ver la lista de productos
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    //establecer cuantos objetos quiero por pagina en este casi muestra de a 3 por pagina de 8 producto que hay
    const resPerPage = 4;
    //cuente cuantos objetos hay ne total pero solo muestra algunos
    const productsCount = await producto.countDocuments();

    const apiFeatures = new APIFeatures(producto.find(), req.query)
        //metodo para que busque por todos los medios
        .search()
        //metodo para filtrar
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })


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
    let imagen=[]

    if (typeof req.body.imagen=="string"){
        imagen.push(req.body.imagen)
    }else{
        imagen=req.body.imagen
    }
    if (imagen!== undefined){
        //eliminar imagenes asociadas con el product
        for (let i=0; i<product.imagen.lenght; i++){
            const result= await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imageLinks=[]
        for (let i=0; i<imagen.lenght; i++){
            const result=await cloudinary.v2.uploader.upload(imagen[i],{
                folder:"products"
            });
            imageLinks.push({
                public_id:result.public_id,
                url: result.secure_url
            })
        }
        req.body.imagen=imageLinks
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
    let imagen = []
    if (typeof req.body.imagen === "string") { // sie le tipo que se encuentra en el area de imagen es un string
        imagen.push(req.body.imagen) //envielo a la BD
    } else {
        imagen = req.body.imagen //imagen va a ser a lo que sea que se encuentre en el body
    }

    let imagenLink = [] // guarda y genera links

    for (let i = 0; i < imagen.length; i++) { //mide la medida del arrgelo es decir si hay varias imagenes  genera un link
        const result = await cloudinary.v2.uploader.upload(imagen[i], { // cargue cada una de las imagenes en un arreglo
            folder: "products" // guardelo en el acarpta products en cloudinary.com (revisar)
        })
        imagenLink.push({ // envia los lnk a la bd
            public_id: result.public_id, // coja cada una de las fotos
            url: result.secure_url
        })
    }
    req.body.imagen = imagenLink
    req.body.user = req.user.id;
    const product = await producto.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})


//Crear o actualizar una review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comentario, idProducto } = req.body;
    //esto es un json que se crea con la siguiente informacion
    const opinion = {
        nombreCliente: req.user.nombre,
        rating: Number(rating), //se castea el ratin para que lo ponga numerico
        comentario
    }

    const product = await producto.findById(idProducto);

    const isReviewed = product.opiniones.find(item => //busque en procutos opiniones y cada opinion conviertala en in item
        item.nombreCliente === req.user.nombre) //revise si el nombre cliente es igual al nombre de la persona logueada si coincide no puedo crear una opinion
    //debo actualizarla entonces

    if (isReviewed) { //si isReviewed es verdadero
        product.opiniones.forEach(opinion => { //recorra el arreglo que asuma qque los obejtos que hay es una opnion y que verifique cual es la del usuario para actualizara

            if (opinion.nombreCliente === req.user.nombre) {
                opinion.comentario = comentario,// actualizace a opinion.comentario con la nueva opinion
                    opinion.rating = rating //actialice el raiting
            }
        })
    } else { //sino tome el json y enviele o cree una opnion
        product.opiniones.push(opinion)// creee la  opinion
        product.numCalificaciones = product.opiniones.length//
    }
    //calcular el promedio ponderado o la calidad del producto
    product.calificacion = product.opiniones.reduce((acc, opinion) =>
        opinion.rating + acc, 0) / product.opiniones.length

    await product.save({ validateBeforeSave: false }); //confirma que se debe guardar
    //respuest de que si opino
    res.status(200).json({
        success: true,
        message: "Hemos opinado correctamente"
    })

})


//Ver todas las review de un producto
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.query.id)

    res.status(200).json({
        success: true,
        opiniones: product.opiniones
    })
})

//Eliminar review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.query.idProducto);

    const opiniones = product.opiniones.filter(opinion =>
        opinion._id.toString() !== req.query.idReview.toString());

    const numCalificaciones = opiniones.length;

    const calificacion = product.opiniones.reduce((acc, Opinion) =>
        Opinion.rating + acc, 0) / opiniones.length;

    await producto.findByIdAndUpdate(req.query.idProducto, {
        opiniones,
        calificacion,
        numCalificaciones
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "review eliminada correctamente"
    })

})

//Ver la lista de productos (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await producto.find()

    res.status(200).json({
        products
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
