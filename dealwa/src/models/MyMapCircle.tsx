import Coordinates from "./Coordinates";

export default class MyMapCircle {
    center: Coordinates;
    radius: number;
    name: string;

    constructor(
        center: Coordinates,
        radius: number,
        name: string,
        color: string,
    ) {
        this.center = center;
        this.radius = radius;
        this.name = name;
    }
}