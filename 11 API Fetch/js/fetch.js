/*
Esta es un ejemplo de una API REST utilizando una llamada con Fecth el cual sirve para obtener 
informacion sobre el tipo de api (en este caso pokemon) y obtener su estructura a partir de crear una funcion callback con una promesa
*/

const pokeApiURL = "https://pokeapi.co/api/v2/";

//vamos a crear una funcion para obtener todos los datos de la pokedex, para esto debemos de imaginar el orden y la obtencion de los datos

const pokedex = () => {
    //primmero necesitamos obtener todas las stats del pokemon, asi que necesitamos crear un diccionario para obtener cada uno de los elementos del front 
    // para despues vaciar los datos
    const pokemonStatsElements = {
        hp: document.getElementById("pokemonStatHp"),
        attack: document.getElementById("pokemonStatAttack"),
        defense: document.getElementById("pokemonStatDefense"),
        specialAttack: document.getElementById("pokemonStatSpecialAttack"),
        specialDefense: document.getElementById("pokemonStatSpecialDefense"),
        speed: document.getElementById("pokemonStatSpeed")
    };

    //necesitamos un auxiliar que nos permita utilizar la clase del tipo de pokemon para cmabiar la css
    //dependiendo del tipo

    let currentClassType = null;

    //tiene que cambiar los elementos de la img, para ello tenemos que crear un template que se encargue de encadenar los datos
    const imageTemplate = "<img class = 'pokedisplay' src='imgSrc' alt='pokedisplay'/>";

    //necesitamos un objto que se encargue de guardar las rutas de las imgs q vamos a cambiar dependiendo de si es una busqueda, lo encontro o no al pokemon

    const images = {
        imgPokemonNotFound: "../img/404.png",
        imgLoading: "../img/loading.gif"
    };

    //necesitamos una variable que guarde todos los contenedores de la pokedex

    const containers = {
        imagenContainer: document.getElementById("pokedisplay-container"),
        pokemonTypesContainer: document.getElementById("pokemonTypes"),
        pokemonNameElement: document.getElementById("pokemonNameResult"),
        pokemonAbilitiesElement: document.getElementById("pokemonAbilities"),
        pokemonMovesElement: document.getElementById("pokemonMoves"),
        pokemonIdElement: document.getElementById("pokemonId")
    };

    //necesitamos un objeto de tipo array que guarde los botones con su tipo de referencia

    const buttons = {
        all: Array.from(document.getElementsByClassName("btn")),
        search: document.getElementById("btnSearch"),
        next: document.getElementById("btnUp"),
        previous: document.getElementById("btnDown")
    };

    //para buscar un pokemon necesitamos una variable que guarde el nombre del pokemon
    const pokemonInput = document.getElementById("pokemonName");
    //las promesas son de tipo asincronas
    //la agrupacion de los elementos en este objeto debe ser una estructurta que nos permita crear 
    // funciones mas pequeñas que sin importar el orden puedan obtener cada uno de los datos solicitados

    const processPokemonType = (pokemonData) => {
        //primero necesitamos obtener el tipo de pokemon, el nombre y la clase para que se modifique en el html, una vez con ello tenemos que obtener los stats, movs, habs

        let pokemonType = "";
        //utilizo una busqueda de la clase de pokemon, eso se refiere al tipo de pokemon

        const firstClass = pokemonData.types[0].type.name;

        pokemonData.types.forEach((pokemonTypeData) => {
            //necesito tener la etiqueta de cada cambio
            pokemonType += `<span class = "pokemon-type ${pokemonData.type.name}"> ${pokemonTypeData.type.name}</span>`
        });
        //para poder quitar y cambiar el contenedor dependiendo del tipo tengo que saber a cual pertenece

        if (currentClassType) {
            containers.pokemonMovesElement.classList.remove(currentClassType);
            containers.pokemonAbilitiesElement.classList.remove(currentClassType);
        }//ahora tengo que agregar lo nuevo
        containers.pokemmonMovesElement.classList.add(firstClass);
        containers.pokemonAbilitiesElement.classList.add(firstClass);
        //debo de agregar las etiquetas creadas dentro del forEach

        containers.pokemonTypesContainer.innerHTML = pokemonType;
    };

    //ahora necesitamos obtener las stats del pokemon
    const processPokemonStats = (pokemonData) => {
        pokemonData.stats?.forEach((pokemonStatData) => {
            //vamos a evaluar si encuentra el nombre de la stat para colocarlo en su container correspondiente
            switch (pokemonStatData.stat.name) {
                case "hp":
                    pokemonStatsElements.hp.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "attack":
                    pokemonStatsElements.attack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "defense":
                    pokemonStatsElements.defense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "special-attack":
                    pokemonStatsElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "special-defense":
                    pokemonStatsElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
                case "speed":
                    pokemonStatsElements.speed.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                    break;
            }
        });
    };
};