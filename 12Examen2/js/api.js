const agentsURL = "https://valorant-api.com/v1/agents";
const mapsURL = "https://valorant-api.com/v1/maps";
const weaponsURL = "https://valorant-api.com/v1/weapons";
const gamemodesURL = "https://valorant-api.com/v1/gamemodes";

const valoAPI = () => {
    const agentContainers = {
        imageContainer: document.getElementById("agntdisplay-container"),
        nameContainer: document.getElementById("agnt-name-display"),
        role: document.getElementById("agnt-role"),
        description: document.getElementById("agnt-description"),
        abilities: document.getElementById("agnt-abilities"),
    };

    const gamemodeContainers = {
        imageContainer: document.getElementById("gmmd-display-container"),
        nameContainer: document.getElementById("gamemode-name-display"),
        name: document.getElementById("gamemode-name"),
        description: document.getElementById("gamemode-description"),
        duration: document.getElementById("gamemode-duration"),
        economyType: document.getElementById("gamemode-economy-type")
    };

    const mapContainers = {
        imageContainer: document.getElementById("map-display-container"),
        nameContainer: document.getElementById("map-name-display"),
        name: document.getElementById("map-name"),
        description: document.getElementById("map-description"),
        location: document.getElementById("map-location"),
        coordinates: document.getElementById("map-coordinates")
    };

    const weaponContainers = {
        imageContainer: document.getElementById("weapon-display-container"),
        nameContainer: document.getElementById("weapon-name-display"),
        name: document.getElementById("weapon-name-display"),
        category: document.getElementById("display-weapon-category"),
        fireRate: document.getElementById("weapon-fire-rate"),
        reloadTime: document.getElementById("weapon-reload-time"),
        penetration: document.getElementById("weapon-penetration"),
        headDamage: document.getElementById("weapon-head-damage"),
        bodyDamage: document.getElementById("weapon-body-damage"),
        legDamage: document.getElementById("weapon-leg-damage"),
        cost: document.getElementById("weapon-cost")
    };

    const agentInput = document.getElementById("agnt-name");
    const gamemodeInput = document.getElementById("gamemode-name");
    const mapInput = document.getElementById("map-name");
    const weaponInput = document.getElementById("weapon-name");

    const agentButtons = {
        search: document.getElementById("btn-search-agnt"),
        up: document.getElementById("btn-up-agnt"),
        down: document.getElementById("btn-down-agnt")
    };
    const gamemodeButtons = {
        search: document.getElementById("btn-search-gamemode"),
        up: document.getElementById("btn-up-gamemode"),
        down: document.getElementById("btn-down-gamemode")
    };
    const mapButtons = {
        search: document.getElementById("btn-search-map"),
        up: document.getElementById("btn-up-map"),
        down: document.getElementById("btn-down-map")
    };
    const weaponButtons = {
        search: document.getElementById("btn-search-weapon"),
        up: document.getElementById("btn-up-weapon"),
        down: document.getElementById("btn-down-weapon")
    };

    const imageTemplate = "<img class='{className}' src='{src}' alt='{altText}'/>";
    const images = {
        img404: "./img/404.png"
    }

    let agentsData = [];
    let gamemodesData = [];
    let mapsData = [];
    let weaponsData = [];

    let currentAgentIndex = 0;
    let currentGamemodeIndex = 0;
    let currentMapIndex = 0;
    let currentWeaponIndex = 0;

    //obtener todos los datos

    const getAgents = async () => {
        try {
            const response = await fetch(agentsURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error("Request Failed");
            const data = await response.json();
            agentsData = data.data.filter(agent => agent.isPlayableCharacter);
            console.log("Agentes cargados: ", agentsData.length);
            return agentsData;
        } catch (error) {
            console.error("Error al obtener los agentes: ", error);
            alert("No se pudieron cargar los agentes favor de intentarlo mas tarde")
            return [];
        }
    };

    const getGamemodes = async () => {
        try {
            const response = await fetch(gamemodesURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error("Request Failed");
            const data = await response.json();
            gamemodesData = data.data;
            console.log("Modos de juego cargados: ", gamemodesData.length);
            return gamemodesData;
        } catch (error) {
            console.error("Error al obtener los modos de juego: ", error);
            alert("No se pudieron cargar los modos de juego favor de intentarlo mas tarde")
            return [];
        }
    };

    const getMaps = async () => {
        try {
            const response = await fetch(mapsURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error("Request Failed");
            const data = await response.json();
            mapsData = data.data;
            console.log("Mapas cargados: ", mapsData.length);
            return mapsData;
        } catch (error) {
            console.error("Error al obtener los mapas: ", error);
            alert("No se pudieron cargar los mapas favor de intentarlo mas tarde")
            return [];
        }
    };

    const getWeapons = async () => {
        try {
            const response = await fetch(weaponsURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error("Request Failed");
            const data = await response.json();
            weaponsData = data.data;
            console.log("Armas cargadas: ", weaponsData.length);
            return weaponsData;
        } catch (error) {
            console.error("Error al obtener las armas: ", error);
            alert("No se pudieron cargar las armas favor de intentarlo mas tarde")
            return [];
        }
    };


    //mostrar los datos de los agentes
    const processAgentAbilities = (agent) => {
        let abilitiesHTML = "<ul style='list-style-type: none; padding: 0;'>";
        agent.abilities?.forEach(ability => {
            abilitiesHTML += `<li>${ability.displayName}: ${ability.description}</li>`;
        });
        abilitiesHTML += "</ul>";
        return abilitiesHTML;
    };

    const displayAgent = (agent) => {
        if (!agent) {
            console.warn("Agente no encontrado");
            return;
        }

        if (agentContainers.imageContainer) {
            agentContainers.imageContainer.innerHTML = imageTemplate
                .replace('{className}', 'agnt-display')
                .replace('{src}', agent.displayIcon || images.img404)
                .replace('{altText}', agent.displayName);
        }

        if (agentContainers.nameDisplay) {
            agentContainers.nameDisplay.innerHTML = agent.displayName;
        }

        if (agentContainers.role) {
            agentContainers.role.innerHTML = agent.role ? agent.role.displayName : "Sin rol";
        }

        if (agentContainers.description) {
            agentContainers.description.innerHTML = agent.description || "Sin descripción";
        }

        if (agentContainers.abilities) {
            agentContainers.abilities.innerHTML = processAgentAbilities(agent);
        }
    };

    const searchAgent = (agentName) => {
        if (!agentName) {
            alert("Por favor ingresa el nombre de un agente");
            return;
        }

        const agent = agentsData.find(a => a.displayName.toLowerCase().includes(agentName.toLowerCase()));

        if (agent) {
            currentAgentIndex = agentsData.indexOf(agent);
            displayAgent(agent);
        } else {
            alert("Agente no encontrado");
        }
    };

    //mostrar los datos de los modos de juego
    const displayGamemode = (gamemode) => {
        if (!gamemode) {
            console.warn("Modo de Juego no encontrado");
            return;
        }

        if (gamemodeContainers.imageContainer) {
            gamemodeContainers.imageContainer.innerHTML = imageTemplate
                .replace('{className}', 'gmmd-display')
                .replace('{src}', icon)
                .replace('{altText}', gamemode.displayName);
        }

        if (gamemodeContainers.nameDisplay) {
            gamemodeContainers.nameDisplay.innerHTML = gamemode.displayName;
        }

        if (gamemodeContainers.description) {
            gamemodeContainers.description.innerHTML = gamemode.description || "Sin descripción";
        }

        if (gamemodeContainers.duration) {
            gamemodeContainers.duration.innerHTML = gamemode.duration || "N/A"
        }

        if (gamemodeContainers.economyType) {
            gamemodeContainers.economyType.innerHTML = gamemode.economyType || "N/A"
        }
    };

    const setGamemodeData = (gamemodeName) => {
        if (!gamemodeName) {
            alert("Por favor ingresa el nombre de un modo de juego");
            return;
        }

        const gamemode = gamemodesData.find(g => g.displayName.toLowerCase().includes(gamemodeName.toLowerCase()));

        if (gamemode) {
            currentGamemodeIndex = gamemodesData.indexOf(gamemode);
            displayGamemode(gamemode);
        } else {
            alert("Modo de Juego no encontrado");
        }
    };

    //mostrar los datos de los mapas
    const displayMap = (map) => {
        if (!map) {
            console.warn("Mapa no encontrado");
            return;
        }

        if (mapContainers.imageContainer) {
            mapContainers.imageContainer.innerHTML = imageTemplate
                .replace('{className}', 'map-display')
                .replace('{src}', map.splash || images.img404)
                .replace('{altText}', map.displayName);
        }

        if (mapContainers.nameDisplay) {
            mapContainers.nameDisplay.innerHTML = map.displayName;
        }

        if (mapContainers.description) {
            mapContainers.description.innerHTML = map.narrativeDescription || map.tacticalDescription || "Sin descripción";
        }

        if (mapContainers.coordinates) {
            mapContainers.coordinates.innerHTML = map.coordinates || "N/A"
        }
    };

    const searchMap = (mapName) => {
        if (!mapName) {
            alert("Por favor ingresa el nombre de un mapa");
            return;
        }

        const map = mapsData.find(m => m.displayName.toLowerCase().includes(mapName.toLowerCase()));

        if (map) {
            currentMapIndex = mapsData.indexOf(map);
            displayMap(map);
        } else {
            alert("Mapa no encontrado");
        }
    };

    //mostrar datos de las armas
    processWeaponStats = (weapon) => {
        const stats = weapon.weaponStats;
        if (!stats) return "Sin estadísticas";

        if (stats.fireRate) {
            weaponContainers.fireRate.textContent = stats.fireRate || "N/A";
        }

        if (stats.reloadTime) {
            weaponContainers.reloadTime.textContent = stats.reloadTime || "N/A";
        }

        if (stats.penetration) {
            weaponContainers.penetration.textContent = stats.wallPenetration || "N/A";
        }
        const damageRanges = stats.damageRanges?.[0];
        if (damageRanges) {
            if (weaponContainers.headDamage) {
                weaponContainers.headDamage.textContent = damageRanges.headDamage || "N/A";
            }

            if (weaponContainers.bodyDamage) {
                weaponContainers.bodyDamage.textContent = damageRanges.bodyDamage || "N/A";
            }

            if (weaponContainers.legDamage) {
                weaponContainers.legDamage.textContent = damageRanges.legDamage || "N/A";
            }
        }
    };

    const displayWeapon = (weapon) => {
        if (!weapon) {
            console.warn("Arma no encontrada");
            return;
        }

        if(weaponContainers.imageContainer){
            weaponContainers.imageContainer.innerHTML = imageTemplate
                .replace('{className}', 'weapon-display')
                .replace('{src}', weapon.displayIcon || images.img404)
                .replace('{altText}', weapon.displayName);
        }
        if (weaponContainers.nameDisplay) {
            weaponContainers.nameDisplay.innerHTML = weapon.displayName;
        }

        if (weaponContainers.category) {
            weaponContainers.category.innerHTML = weapon.category || "Sin categoria";
        }

        processWeaponStats(weapon);

        if (weaponContainers.cost) {
            weaponContainers.cost.innerHTML = weapon.shopData?.cost || "N/A";
        }
    };

    const searchWeapon = (weaponName) => {
        if (!weaponName) {
            alert("Por favor ingresa el nombre de un arma");
            return;
        }

        const weapon = gamemodesData.find(w => w.displayName.toLowerCase().includes(weaponName.toLowerCase()));

        if (weapon) {
            currentGamemodeIndex = gamemodesData.indexOf(weapon);
            displayGamemode(gamemode);
        } else {
            alert("Arma no encontrada");
        }
    };

    //validacion de botones

    const checkDisabledAgents = () => {
        if (agentButtons.down) {
            agentButtons.down.disabled = currentAgentIndex <= 0;
        }
        if (agentButtons.up) {
            agentButtons.up.disabled = currentAgentIndex >= agentsData.length - 1;
        }
    };

    const checkDisabledGamemodes = () => {
        if (gamemodeButtons.down) {
            gamemodeButtons.down.disabled = currentGamemodeIndex <= 0;
        }
        if (gamemodeButtons.up) {
            gamemodeButtons.up.disabled = currentGamemodeIndex >= gamemodesData.length - 1;
        }
    };

    const checkDisabledMaps = () => {
        if (mapButtons.down) {
            mapButtons.down.disabled = currentMapIndex <= 0;
        }
        if (mapButtons.up) {
            mapButtons.up.disabled = currentMapIndex >= mapsData.length - 1;
        }
    };

    const checkDisabledWeapons = () => {
        if (weaponButtons.down) {
            weaponButtons.down.disabled = currentWeaponIndex <= 0;
        }
        if (weaponButtons.up) {
            weaponButtons.up.disabled = currentWeaponIndex >= weaponsData.length - 1;
        }
    };

    //trigers para hacer el search

    const trigger = () => {
        //trigger de agentes
        if (agentButtons.search){
            agentButtons.search.onclick = () => setAgentData(agentInput?.value);
        }
        if(agentInput){
            agentInput.onkeyup = (event) => {
                event.preventDefault();
                if (event.key === "Enter") {
                    setAgentData(agentInput.value);
                }
            };
        }
        if (agentButtons.up){
            agentButtons.up.onclick = () => {
                if (currentAgentIndex < agentsData.length - 1) {
                    setAgentData(currentAgentIndex + 1);
                    checkDisabledAgents();
                }
            };
        }
        if (agentButtons.down){
            agentButtons.down.onclick = () => {
                if (currentAgentIndex > 0) {
                    setAgentData(currentAgentIndex - 1);
                    checkDisabledAgents();
                }
            };
        }

        //trigger de modos de juego
        if (gamemodeButtons.search){
            gamemodeButtons.search.onclick = () => setGamemodeData(gamemodeInput?.value);
        }
        if(gamemodeInput){
            gamemodeInput.onkeyup = (event) => {
                event.preventDefault();
                if (event.key === "Enter") {
                    setGamemodeData(gamemodeInput.value);
                }
            };
        }
        if (gamemodeButtons.up){
            gamemodeButtons.up.onclick = () => {
                if (currentGamemodeIndex < gamemodesData.length - 1) {
                    setGamemodeData(currentGamemodeIndex + 1);
                    checkDisabledGamemodes();
                }
            };
        }
        if (gamemodeButtons.down){
            gamemodeButtons.down.onclick = () => {
                if (currentGamemodeIndex > 0) {
                    setGamemodeData(currentGamemodeIndex - 1);
                    checkDisabledGamemodes();
                }
            };
        }

        //trigger de mapas
        if (mapButtons.search){
            mapButtons.search.onclick = () => setMapData(mapInput.value);
        }
        if(mapInput){
            mapInput.onkeyup = (event) => {
                event.preventDefault();
                if (event.key === "Enter") {
                    setMapData(mapInput.value);
                }
            };
        }
        if (mapButtons.up){
            mapButtons.up.onclick = () => {
                if (currentMapIndex < mapsData.length - 1) {
                    setMapData(currentMapIndex + 1);
                    checkDisabledMaps();
                }
            };
        }
        if (mapButtons.down){
            mapButtons.down.onclick = () => {
                if (currentMapIndex > 0) {
                    setMapData(currentMapIndex - 1);
                    checkDisabledMaps();
                }
            };
        }

        //trigger de armas
        if (weaponButtons.search){
            weaponButtons.search.onclick = () => setWeaponData(weaponInput.value);
        }
        if(weaponInput){
            weaponInput.onkeyup = (event) => {
                event.preventDefault();
                if (event.key === "Enter") {
                    setWeaponData(weaponInput.value);
                }
            };
        }
        if (weaponButtons.up){
            weaponButtons.up.onclick = () => {
                if (currentWeaponIndex < weaponsData.length - 1) {
                    setWeaponData(currentWeaponIndex + 1);
                    checkDisabledWeapons();
                }
            };
        }
        if (weaponButtons.down){
            weaponButtons.down.onclick = () => {
                if (currentWeaponIndex > 0) {
                    setWeaponData(currentWeaponIndex - 1);
                    checkDisabledWeapons();
                }
            };
        }
    };

    //inicializacion

    const init = async () => {
        console.log("Iniciando Valorant API...");

        await Promise.all([
            getAgents(),
            getGamemodes(),
            getMaps(),
            getWeapons()
        ]);

        console.log("Valorant API iniciada correctamente.");

        trigger();

    };
    init();

};

window.onload = valoAPI;