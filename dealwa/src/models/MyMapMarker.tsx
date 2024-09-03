import Coordinates from "./Coordinates";

export default class MyMapMarker {
    coordinates: Coordinates;
    title: string;
    description: string;
    type?: string;

    constructor(
        coordinates: Coordinates,
        title: string,
        description: string,
        type: string
    ) {
        this.coordinates = coordinates;
        this.title = title;
        this.description = description;
        this.type = type;
    }
}