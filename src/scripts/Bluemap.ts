import { bluemap } from "./app";
import ServerMap from "./worlds/ServerMap";

export default class Bluemap {
    private worldsMap: Map<String, ServerMap> = new Map();
    private playerMaps: Map<String, String> = new Map();

    constructor() {
        this.reloadPlayerMaps()
    }

    async getPlayerMap(uuid: string) {
        if(this.playerMaps.has(uuid)) {
            console.log(`Using cached world info for player ${uuid}`)
            return this.playerMaps.get(uuid);
        }
        return this.findPlayerMap(uuid);
    }

    getWorld(id: String): ServerMap|null {
        if(this.worldsMap.has(id)) {
            return this.worldsMap.get(id);
        }
        return null;
    }

    async reloadPlayerMaps() {
        for(let map of bluemap.maps) {
            let playerData = await bluemap.loadPlayerData(map);
            if (!Array.isArray(playerData.players)) continue;
            console.log(`Loading player data from map ${map.data.id}`)
            for (let p of playerData.players) {
                if(!p.foreign) this.playerMaps.set(p.uuid, map.data.id)
            }
        }
    }

    registerWorld(id: String, world: ServerMap) {
        this.worldsMap.set(id, world);
    }

    async findPlayerMap(playerUuid) {
        /** @type BlueMapMap */
        let matchingMap = null;
        console.log(`Loading world info for player ${playerUuid}`)

        // search for the map that contains the player
        for (let map of bluemap.maps) {
            let playerData = await bluemap.loadPlayerData(map);
            if (!Array.isArray(playerData.players)) continue;
            for (let p of playerData.players) {
                if (p.uuid === playerUuid && !p.foreign) {
                    matchingMap = map.data.id;
                    break;
                }
            }

            if (matchingMap) break;
        }
        

        return matchingMap;
    }
}