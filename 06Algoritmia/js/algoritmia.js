function  vermayus(e){
     var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /^[A-Z,]$/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function verletras(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /^[A-Za-z\s]$/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function problema1(){
   var input = document.getElementById("p1-input").value;
   var palabras = input.split(" ");
   var orden = palabras.reverse();
   document.getElementById("p1-output").textContent = orden.join(" ");
}

function problema2(){
    //pe profe
    //priero necesitamos los valores
    var p2_x1= document.querySelector("#p2-x1").value;
    var p2_x2= document.querySelector("#p2-x2").value;
    var p2_x3= document.querySelector("#p2-x3").value;
    var p2_x4= document.querySelector("#p2-x4").value;
    var p2_x5= document.querySelector("#p2-x5").value;
    
    var p2_y1= document.querySelector("#p2-y1").value;
    var p2_y2= document.querySelector("#p2-y2").value;
    var p2_y3= document.querySelector("#p2-y3").value;
    var p2_y4= document.querySelector("#p2-y4").value;
    var p2_y5= document.querySelector("#p2-y5").value;

    //creamos los vectores

    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    //creamos el vector resultado

    v1 = v1.sort(function(a, b){return b-a});
    V2 = V2.sort(function(a, b){return b-a});
    v2 = v2.reverse();

    var p2_producto = 0;
    for(var i = 0; i < v1.length; i++){
        p2_producto += v1[i] * v2[i];
    }

    document.querySelector("#p2-output").textContent = "El producto escalar minimo es: " + p2_producto;

}

function problema3(){
    var input = document.getElementById("p3-input").value;
    var palabras = input.split(",");

    function letrasu(palabra){
        let caracteresu = new Set();
        
        for(let caracter of palabra){
            if(/[A-Z]/.test(caracter)){
                caracteresu.add(caracter)
            }
        }
    }

    var maxcarcat = 0;
    let palabraF = "";

    palabras.forEach(palabra => {
        var ncaract = letrasu(palabra.trim());

        if(ncaract > maxcarcat){
            maxcarcat = ncaract;
            palabraF = palabra.trim();
        }
    });

    document.getElementById("p3-output").textContent = ("Palabra con más caracteres unicos: " + palabraF + "Num. de Caracteres: " + maxcarcat); 
}