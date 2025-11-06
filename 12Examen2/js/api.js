const agentsURL = "https://valorant-api.com/v1/agents";
const mapsURL = "https://valorant-api.com/v1/maps";
const weaponsURL = "https://valorant-api.com/v1/weapons";
const gamemodesURL = "https://valorant-api.com/v1/gamemodes";

const valoAPI = () => {
    const agentContainers ={
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

    let agentsData = [];
    let gamemodesData = [];
    let mapsData = [];
    let weaponsData = [];

    let currentAgentIndex = 0;
    let currentGamemodeIndex = 0;
    let currentMapIndex = 0;
    let currentWeaponIndex = 0;

    const getAgents = async () => {
        try {
            const response = await fetch(agentsURL);
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
            const response = await fetch(gamemodesURL);
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
            const response = await fetch(mapsURL);
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
            const response = await fetch(weaponsURL);
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

    const displayAgent = (agent) => {
        if(!agent){
            console.warn("Agente no encontrado");
            return;
        }

        if(agentContainers.imageContainer){
            agentContainers.imageContainer.innerHTML = `<img class="weapon-display" src="${agent.displayIcon}" alt="${agent.displayName}">`;
        }

        if(agentContainers.nameDisplay){
            agentContainers.nameDisplay.textContent = agent.displayName;
        }

        if(agentContainers.role){
            agentContainers.role.textContent = agent.role ? agent.role.displayName : "Sin rol";
        }

        if(agentContainers.description){
            agentContainers.description.textContent = agent.description || "Sin descripción";
        }

        if(agentContainers.abilities){
            let abilitiesHTML = "<ul>";
            agent.abilities?.forEach(ability => {
                abilitiesHTML += `<li>${ability.displayName}: ${ability.description}</li>`;
            });
            abilitiesHTML += "</ul>";
            agentContainers.abilities.innerHTML = abilitiesHTML;
        }
    };

    const searchAgent = (agentName) => {
        if (!agentName){
            alert("Por favor ingresa el nombre de un agente");
            return;
        }

        const agent = agentsData.find(a => a.displayName.toLowerCase().includes(agentName.toLowerCase()));

        if (agent){
            currentAgentIndex = agentsData.indexOf(agent);
            displayAgent(agent);
        }else{
            alert("Agente no encontrado");
        }
    };

}