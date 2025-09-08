import { bluemap } from "../app";
import { Dimension, getDimensionIcon } from "./Dimension";

export default class ServerMap {
    public name: string;
    private id: string;
    private dimension: Dimension = Dimension.OVERWORLD;
    private icon: string = getDimensionIcon(Dimension.OVERWORLD);

    private buttonElement: Element;
    private iconElement: HTMLImageElement|null = null;

    constructor(id: string, name: string, element: Element) {
        this.name = name;
        this.id = id;

        Object.values(Dimension).forEach(dimension => {
            if(name.includes(dimension)) this.dimension = dimension;
        })

        this.refreshDisplay(element);

        console.log(`Registering world ${this.id} (${this.dimension})`)
    }

    refreshDisplay(newElement: Element) {
        this.buttonElement = newElement;
        this.iconElement = this.buttonElement.querySelector('.world_icon');

        let skyIcon: Element = this.buttonElement.querySelector('.sky');
        if(skyIcon !== null) skyIcon.remove();
        
        if(this.iconElement == null) {
            this.createElementIcon();
            this.fetchIcon();
        }
    }

    createElementIcon(): void {
        let element: HTMLImageElement = document.createElement('img');
        this.iconElement = element;
        this.iconElement.classList.add('world_icon');
        this.iconElement.src = "assets/world_icons/default.png";
        this.buttonElement.prepend(element);
    }

    /**
     * Attemps to find an icon at the expected path.
     */
    fetchIcon(): void {
        let expectedPath = `assets/world_icons/${this.id}.png`;
        fetch(expectedPath)
        .then(response => {
            if(response.status !== 404) {
                this.icon = expectedPath;
            }else{
                this.icon = getDimensionIcon(this.dimension);
            }

            this.iconElement.src = this.icon;
        });
    }

}