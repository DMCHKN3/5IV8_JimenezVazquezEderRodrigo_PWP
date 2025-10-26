const mirrow = (req, res) => {
    const methods = [{
        method: 'POST',//registrar dentro de un servicio
        hasBody: true,
        purpouse:"El metodo POST se utiliza para enviar una entidad a un recurso especifico, causando a menudo un cambio en el estado o efectos secundarios en el servidor." 
    }, {
        method: 'PUT', //es un update
        hasBody: true,
        purpouse: "El metodo PUT reemplaza todas las representaciones actuales del recurso de destino con la carga util de la peticion."
    },{
        method: 'PATCH',//update pero no a todo, si no que a una parte
        hasBody: true,
        purpouse: "El metodo PATCH es utilizado para aplicar modificaciones parciales a un recurso."
    },{
        method: 'HEAD',//tipo de respuesta dependiendo del tipo de usuario y servicio
        hasBody: false,
        purpouse: "El metodo HEAD pide una respuesta identica a la de una peticion GET, pero sin el cuerpo de la respuesta."
    },{
        method: 'GET',//cualquier peticion x defecto
        hasBody: false,
        purpouse: "El metodo GET solicita una representacion de un recurso especifico. Las peticionas que usan el metodo GET solo deben recuperar datos."
    },{
        method: 'DELETE',//eliminar 
        hasBody: false,
        purpouse: "El metodo DELETE elimina un recurso especifico."
    }];

    const requestMethod = methods.find(//funcion flecha se manda a llamar a si misma (recursividad)
        m => m.method === req.method) || {
            method: req.method,
            hasBody: false,
            purpouse: "No tiene un body, No hay una respuesta, Metodo no soportado" //a consideracion de cada uno 
        };

        requestMethod.purpouse += requestMethod.hasBody ? "Tiene cuerpo" : "No tiene cuerpo";

        if (requestMethod.hasBody) {
            //body es lit el body del html
            req.body; //js debe de parsear mediante un json el objeto necesario
            res.json({...req.body, ruta_consumida: req.route.path, ...requestMethod});
        }else{
            res.json({ruta_consumida: req.originalUrl, ...requestMethod});
        }
};

module.exports = mirrow;