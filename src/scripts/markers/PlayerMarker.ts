import { bluemap, loadEvents, mapImplementation } from "../app";

export default class PlayerMarker {
    private uuid: string;
    private marker: object;
    private button: Element;
    private map: string;

    constructor(uuid: string, button: Element) {
        this.uuid = uuid;
        this.marker = bluemap.playerMarkerManager.getPlayerMarker(uuid)
        this.button = button;

        this.createButtonEvent();
    }

    createButtonEvent() {
        this.button.addEventListener("click", event => {
            event.preventDefault()
            this.follow()
            console.log(`Tracked player '${this.uuid}'`)
        });
    }

    follow(): void {
        console.log("Switching map")
        mapImplementation.getPlayerMap(this.uuid).then(map => {
            bluemap.switchMap(map).then(() => {
                bluemap.mapControls.followPlayerMarker(this.marker);
                loadEvents()
            })
        })
    }
}