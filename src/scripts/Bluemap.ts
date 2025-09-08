import ServerMap from "./worlds/ServerMap";

export default class Bluemap {
    private worldsMap: Map<String, ServerMap> = new Map();

    getWorld(id: String): ServerMap|null {
        if(this.worldsMap.has(id)) return this.worldsMap.get(id);
        return null;
    }

    registerWorld(id: String, world: ServerMap) {
        this.worldsMap.set(id, world);
    }
}