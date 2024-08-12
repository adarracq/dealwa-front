
export default class User {
    id: string | null;
    email: string;
    password: string;
    name: string;

    constructor(
        email: string,
        password: string,
        name: string,
    ) {
        this.id = null;
        this.email = email;
        this.password = password;
        this.name = name;
    }

}
