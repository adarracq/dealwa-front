import Coordinates from "./Coordinates";

export default class Project2 {
    _id: string | null;
    user_id: string;
    user_firstname: string;
    date: Date;
    type: number;
    status: string;
    description: string;
    coord: number[];
    address: string;
    radius: number;

    constructor(
        user_id: string,
        user_firstname: string,
        date: Date,
        type: number,
        status: string,
        description: string,
        coord: number[],
        address: string,
        radius: number
    ) {
        this._id = null;
        this.user_id = user_id;
        this.user_firstname = user_firstname;
        this.date = date;
        this.type = type;
        this.status = status;
        this.description = description;
        this.coord = coord;
        this.address = address;
        this.radius = radius;
    }
}