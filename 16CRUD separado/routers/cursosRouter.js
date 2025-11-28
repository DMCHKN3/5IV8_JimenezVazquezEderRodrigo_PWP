//este es el middleware, es el q se encarga a pasar los datos de front y back

const {Router} = require('express');

//definir la ruta del consumo del endpoint

const cursosControles = require('../controlls/cursosControl.js');

const cursosRouter = Router();

//ya se puede crear el CRUD como tal
//definir cada endpoint

cursosRouter.get('/', cursosControles.getCursos);
//necesito busqueda x id

cursosRouter.get('/:id', cursosControles.getCursosById);
/*
//post
cursosRouter.post('/registrar-curso', cursosControles.createCurso);

//put
cursosRouter.put('/:id', cursosControles.updateCurso);

//delete
cursosRouter.delete('/:id', cursosControles.deleteCurso);

*/
//esto en si es una api

module.exports = cursosRouter;