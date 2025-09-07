import '../styles/styles.scss';
let bluemap = (window as any).bluemap;

document.body.addEventListener("click", () => {
    setTimeout(() => {
        if(document.querySelector(".map-button") !== null) {
            sortMaps();
        }
    }, 10);
})

function sortMaps(): void {
    let buttons: Map<String, Element> = new Map();
    let elementsList = document.querySelectorAll(".map-button");

    elementsList.forEach(button => {
        let mapId: string = button.querySelector(".name").innerHTML;
        buttons.set(mapId, button);
    });

    buttons = new Map([...buttons.entries()].sort());

    const mapsWindow: Element = elementsList[0].parentElement;
    buttons.forEach((el: Element, id: string) => {
        mapsWindow.appendChild(el);
    });
}
