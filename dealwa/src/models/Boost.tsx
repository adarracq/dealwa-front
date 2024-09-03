export default class Boost {
    _id: string | null;
    user_id: string;
    date: Date;
    type: string;
    status: string;
    expirationDate: Date;

    constructor(
        user_id: string,
        date: Date,
        type: string,
        status: string,
        expirationDate: Date
    ) {
        this._id = null;
        this.user_id = user_id;
        this.date = date;
        this.type = type;
        this.status = status;
        this.expirationDate = expirationDate;
    }

}