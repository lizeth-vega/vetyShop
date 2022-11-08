class APIFeatures{
    constructor(query, queryStr){
    this.query=query;
    this.queryStr=queryStr
}

//sistema de busque por  una palabra clase que escriban
search(){
    const keyword= this.queryStr.keyword ? {
        nombre:{
            $regex:this.queryStr.keyword, //busca letras sin importar donde esten y si son mayu-minus
            $options:'i' //i= insensible
        }
    }:{}

    this.query= this.query.find({...keyword});
    return this
}
//filtro para buscar entre uno y otro precio
filter(){
    const queryCopy = { ...this.queryStr};

    //eliminemos los campos que vienen de otras consultas
    const removeFields= ["keyword", "limit", "page"]
    removeFields.forEach(el => delete queryCopy[el])

    //Filtro avanzado para precio
    let queryStr= JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match =>
    `$${match}`)

    this.query= this.query.find(JSON.parse(queryStr))
    return this
}

//paginacion
pagination(resPerPage){
    const currentPage = Number(this.queryStr.page) || 1; //dice cual es la pagina actual se tiene que poner donde empieza x eso el ||1
    const skip = resPerPage * (currentPage-1); //la cantidad de resultaod por pagina multipliquela por la pgina actual 

    this.query= this.query.limit(resPerPage).skip(skip) //establece el limite
    return this
}

}

module.exports = APIFeatures