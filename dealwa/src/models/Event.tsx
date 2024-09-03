import User from "./User";

export default class Event {
    _id: string | null;
    date: Date;
    type: number;
    asker: User;
    guests: User[];
    title: string;
    description: string;
    hourStart: string;
    hourEnd: string;
    status: string;

    constructor(
        date: Date,
        type: number,
        asker: User,
        guests: User[],
        title: string,
        description: string,
        hourStart: string,
        hourEnd: string,
        status: string
    ) {
        this._id = null;
        this.date = date;
        this.type = type;
        this.asker = asker;
        this.guests = guests;
        this.title = title;
        this.description = description;
        this.hourStart = hourStart;
        this.hourEnd = hourEnd;
        this.status = status;
    }
}