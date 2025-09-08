import '../styles/styles.scss';
import Bluemap from './Bluemap';
import ServerMap from './worlds/ServerMap';

export let bluemap = (window as any).bluemap;
export let mapImplementation = new Bluemap();

loadDefaultMap("monde5_2");

document.body.addEventListener("click", () => {
    setTimeout(() => {
        if(document.querySelector(".map-button") !== null) {
            sortMaps();
        }
    }, 10);
})


function loadDefaultMap(defaultMap: string): void {
    if(defaultMap in bluemap.mapsMap) {
        bluemap.switchMap(defaultMap)
    }
}

function sortMaps(): void {
    let buttons: Map<String, Element> = new Map();
    let elementsList = document.querySelectorAll(".map-button");

    elementsList.forEach(button => {
        let mapId: string = button.querySelector(".name").innerHTML;
        buttons.set(mapId, button);
    });

    buttons = new Map([...buttons].sort((a, b) => String(a[0]).localeCompare(String(b[0]))));

    const mapsWindow: Element = elementsList[0].parentElement;
    buttons.forEach((el: Element, name: string) => {
        mapsWindow.appendChild(el);
        let id = el.getAttribute("title");

        if(mapImplementation.getWorld(id) !== null) {
            let world = mapImplementation.getWorld(id);
            world.refreshDisplay(el)
            return;
        }

        mapImplementation.registerWorld(id, new ServerMap(id, name, el))

    });


}
