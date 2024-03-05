import ApiReturn from "./ApiReturn";

export default class PlayerSearchResult extends ApiReturn {
    url: string;
    firstName: string;
    lastName: string;
    alias: string;
    age: number;
    gender: string;
    nationality: string;
    currentTeam: string;

    constructor(data = null) {
        super();
        if (data === null) return;
        this.url = data.url;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.alias = data.alias;
        this.age = data.age;
        this.gender = data.gender;
        this.nationality = data.nationality;
        this.currentTeam = data.currentTeam;
    }
}