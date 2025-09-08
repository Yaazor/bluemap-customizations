import '../styles/styles.scss';
import ServerMap from './worlds/ServerMap';
export let bluemap = (window as any).bluemap;

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
    buttons.forEach((el: Element, id: string) => {
        mapsWindow.appendChild(el);
        new ServerMap(id, el)
    });


}
