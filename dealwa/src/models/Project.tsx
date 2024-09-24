
export default class Project {
    _id: string | null;
    user_id: string;
    user_firstname: string;
    date: string;
    tag: number[];  // see in Constants/ProjectDetails.ts
    type: number; // see in Constants/ProjectDetails.ts
    categorie: number; // see in Constants/ProjectDetails.ts
    nbRooms: number;
    nbBedrooms: number;
    nbBathrooms: number;
    surface: number;
    gardenSurface: number; // 0 if no garden
    budget: number; // 0 if no budget
    description: string;
    coord: number[];
    address: string;
    radius: number;
    status: number; // 0: en attente, 1: en cours, 2: termin

    constructor(
        user_id: string,
        user_firstname: string,
        date: string,
        tag: number[],
        type: number,
        categorie: number,
        nbRooms: number,
        nbBedrooms: number,
        nbBathrooms: number,
        surface: number,
        gardenSurface: number,
        budget: number,
        description: string,
        coord: number[],
        address: string,
        radius: number,
        status: number
    ) {
        this._id = null;
        this.user_id = user_id;
        this.user_firstname = user_firstname;
        this.date = date;
        this.tag = tag;
        this.type = type;
        this.categorie = categorie;
        this.nbRooms = nbRooms;
        this.nbBedrooms = nbBedrooms;
        this.nbBathrooms = nbBathrooms;
        this.surface = surface;
        this.gardenSurface = gardenSurface;
        this.budget = budget;
        this.description = description;
        this.coord = coord;
        this.address = address;
        this.radius = radius;
        this.status = status;
    }

}