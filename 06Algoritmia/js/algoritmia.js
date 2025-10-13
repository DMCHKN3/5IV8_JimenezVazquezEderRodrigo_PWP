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