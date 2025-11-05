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
    const imageTemplate = "<img class = 'pokedisplay' src='{imgSrc}' alt='pokedisplay'/>";

    //necesitamos un objto que se encargue de guardar las rutas de las imgs q vamos a cambiar dependiendo de si es una busqueda, lo encontro o no al pokemon
    // rutas relativas resueltas desde el html, no desde el archivo js
    const images = {
        imgPokemonNotFound: "./img/404.png",
        imgLoading: "./img/loading.gif"
    };

    //necesitamos una variable que guarde todos los contenedores de la pokedex

    const containers = {
        imagenContainer: document.getElementById("pokedisplay-container"),
        // coincide con el id en tu api.html
        pokemonTypesContainer: document.getElementById("pokemon-types-container"),
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
        let pokemonTypeHtml = "";
        const firstClass = pokemonData.types?.[0]?.type?.name || "";

        pokemonData.types?.forEach((pokemonTypeData) => {
            pokemonTypeHtml += `<span class="pokemon-type ${pokemonTypeData.type.name}">${pokemonTypeData.type.name}</span>`;
        });

        if (containers.pokemonMovesElement && containers.pokemonAbilitiesElement) {
            if (currentClassType) {
                containers.pokemonMovesElement.classList.remove(currentClassType);
                containers.pokemonAbilitiesElement.classList.remove(currentClassType);
            }
            if (firstClass) {
                containers.pokemonMovesElement.classList.add(firstClass);
                containers.pokemonAbilitiesElement.classList.add(firstClass);
                currentClassType = firstClass;
            }
        }

        if (containers.pokemonTypesContainer) {
            containers.pokemonTypesContainer.innerHTML = pokemonTypeHtml;
        }
    };

    //ahora necesitamos obtener las stats del pokemon
    const processPokemonStats = (pokemonData) => {
        pokemonData.stats?.forEach((pokemonStatData) => {
            const pct = Math.min(100, pokemonStatData.base_stat);
            switch (pokemonStatData.stat.name) {
                case "hp":
                    if (pokemonStatsElements.hp) {
                        pokemonStatsElements.hp.innerHTML = pokemonStatData.base_stat;
                        pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pct}%, rgba(0,0,0,1) ${pct}%);`;
                    }
                    break;
                case "attack":
                    if (pokemonStatsElements.attack) {
                        pokemonStatsElements.attack.innerHTML = pokemonStatData.base_stat;
                        pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pct}%, rgba(0,0,0,1) ${pct}%);`;
                    }
                    break;
                case "defense":
                    if (pokemonStatsElements.defense) {
                        pokemonStatsElements.defense.innerHTML = pokemonStatData.base_stat;
                        pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pct}%, rgba(0,0,0,1) ${pct}%);`;
                    }
                    break;
                case "special-attack":
                    if (pokemonStatsElements.specialAttack) {
                        pokemonStatsElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                        pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pct}%, rgba(0,0,0,1) ${pct}%);`;
                    }
                    break;
                case "special-defense":
                    if (pokemonStatsElements.specialDefense) {
                        pokemonStatsElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                        pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pct}%, rgba(0,0,0,1) ${pct}%);`;
                    }
                    break;
                case "speed":
                    if (pokemonStatsElements.speed) {
                        pokemonStatsElements.speed.innerHTML = pokemonStatData.base_stat;
                        pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pct}%, rgba(0,0,0,1) ${pct}%);`;
                    }
                    break;
            }
        });
    };

    //necvesitamos una funcion para poder mapear las habilidades del pokemon y poder mostrarlas en su componente respectivo
    const processPokemonAbilities = (pokemonData) => {
        let pokemonAbilitiesContent = "";
        pokemonData.abilities?.forEach((PokemonAbilityData) => {
            pokemonAbilitiesContent += `<li>${PokemonAbilityData.ability.name}</li>`;
        });
        if (containers.pokemonAbilitiesElement) {
            containers.pokemonAbilitiesElement.innerHTML = pokemonAbilitiesContent;
        }
    };

    const processPokemonMoves = (pokemonData) => {
        let pokemonMovesContent = "";
        pokemonData.moves?.forEach((PokemonMoveData) => {
            pokemonMovesContent += `<li>${PokemonMoveData.move.name}</li>`;
        });
        if (containers.pokemonMovesElement) {
            containers.pokemonMovesElement.innerHTML = pokemonMovesContent;
        }
    };

    //necesito poner la img de cargando y que tambien se deshabiliten los botones
    const setLoading = () => {
        if (containers.imagenContainer) {
            containers.imagenContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
        }
        buttons.all.forEach((button) => {
            button.disabled = true;
        });
    };

    //necesito otra funcion que los habilite
    const setLoadingComplete = () => {
        buttons.all.forEach(button => checkDisabled(button));
    };

    const getPokemonData = async (pokemonName) => fetch(`${pokeApiURL}pokemon/${pokemonName}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json();
    })
    .catch(() => ({ requestFailed: true }));

    //necesitamos validar si se debe habilitar o deshabilitar los botones
    const checkDisabled = (button) => {
        const idNumber = Number(containers.pokemonIdElement?.value || 0);
        if (button.id === "btnDown") {
            button.disabled = idNumber <= 1;
        } else {
            button.disabled = false;
        }
    };

    //mientras ocurre el fecth necesitamos una funcion que vaya armando los datos de la poedex, entonces necesitamos validar el ID o el nombre del pokemon
    const setPokemonData = async (pokemonName) => {
        if (pokemonName || pokemonName === 0) {
            setLoading();

            const query = (typeof pokemonName === "string") ? pokemonName.toLowerCase().trim() : pokemonName;
            const pokemonData = await getPokemonData(query);

            if (pokemonData.requestFailed) {
                if (containers.imagenContainer) containers.imagenContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgPokemonNotFound);
                if (containers.pokemonNameElement) containers.pokemonNameElement.innerHTML = "";
                if (containers.pokemonIdElement) containers.pokemonIdElement.value = 0;
                if (containers.pokemonTypesContainer) containers.pokemonTypesContainer.innerHTML = "";
                if (containers.pokemonMovesElement) containers.pokemonMovesElement.innerHTML = "";
                if (containers.pokemonAbilitiesElement) containers.pokemonAbilitiesElement.innerHTML = "";
            } else {
                if (containers.imagenContainer) {
                    containers.imagenContainer.innerHTML = `${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_default || images.imgPokemonNotFound)} 
        ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_shiny || pokemonData.sprites.front_default || images.imgPokemonNotFound)}`;
                }
                if (containers.pokemonNameElement) containers.pokemonNameElement.innerHTML = pokemonData.name;
                if (containers.pokemonIdElement) containers.pokemonIdElement.value = pokemonData.id;

                processPokemonType(pokemonData);
                processPokemonStats(pokemonData);
                processPokemonAbilities(pokemonData);
                processPokemonMoves(pokemonData);
            }
            setLoadingComplete();
        } else {
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en tu busqueda',
                    text: 'Por favor ingresa un nombre de Pokémon primero',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                alert("Por favor ingresa un nombre de Pokémon primero");
            }
        }
    };

    //la ultima funcion se encarga de vincular todas las busquedas
    const trigger = () => {
        if (buttons.search) {
            buttons.search.onclick = () => setPokemonData(pokemonInput?.value);
        }
        if (pokemonInput) {
            pokemonInput.onkeyup = (event) => {
                event.preventDefault();
                if (event.key === "Enter") {
                    setPokemonData(pokemonInput.value);
                }
            };
        }
        if (buttons.next) {
            buttons.next.onclick = () => { setPokemonData(Number(containers.pokemonIdElement?.value || 0) + 1); };
        }
        if (buttons.previous) {
            buttons.previous.onclick = () => { setPokemonData(Math.max(1, Number(containers.pokemonIdElement?.value || 1) - 1)); };
        }
    };

    setLoadingComplete();
    trigger();
};
// end pokedex

window.onload = pokedex;

