export enum Dimension {
    OVERWORLD = "overworld",
    NETHER = "the_nether",
    THE_END = "the_end"
}

export function getDimensionIcon(dimension: Dimension): string {
    return `assets/world_icons/dimensions/${dimension}.png`;
}