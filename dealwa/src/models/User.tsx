import Boost from "./Boost";
import MyMapCircle from "./MyMapCircle";

export default class User {
    _id: string | null;
    email: string;
    password: string;
    firstname: string;
    lastname: string | null;
    birthdate: string | null;
    languages: number[] | null;
    imageUrl: string | null;
    type: string | null;
    network: string | null;
    status: string | null;
    specialities: string[] | null;
    experience: number | null;
    presentation: string | null;
    zones: MyMapCircle[] | null;
    // subscription
    plan: number | null // premium or basic
    bill: number | null // month or year
    subscriptionDate: Date | null;
    expirationDate: Date | null;
    boosts: [Boost] | null;

    constructor(
        email: string,
        password: string,
        firstname: string,
    ) {
        this._id = '-1';
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = null;
        this.birthdate = null;
        this.languages = null;
        this.imageUrl = null;
        this.type = null;
        this.network = null;
        this.status = null;
        this.specialities = null;
        this.experience = null;
        this.presentation = null;
        this.zones = null;
        this.plan = null;
        this.bill = null;
        this.subscriptionDate = null;
        this.expirationDate = null;
        this.boosts = null;
    }

}