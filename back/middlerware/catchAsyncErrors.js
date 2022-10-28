module.exports = func => (req, res, next) =>
    Promise.resolve(func(req, res, next)) //resuleva el promesa y luego atrapela
        .catch(next)  