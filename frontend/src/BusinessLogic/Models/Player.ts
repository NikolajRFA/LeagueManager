import ApiReturn from "./ApiReturn";

export default class Player extends ApiReturn {
    url: string;
    firstName: string;
    lastName: string;
    alias: string;
    age: number;
    gender: string;
    nationality: string;
    overall: number;
    gameSense: number;
    teamFighting: number;
    dueling: number;
    jglPathing: number;
    waveMgmt: number;
    farming: number;
    currentTeamUrl: string;
    currentTeam: string;

    constructor(data = null) {
        super();
        if (data == null) return;
        this.url = data.url;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.alias = data.alias;
        this.age = data.age;
        this.gender = data.gender;
        this.nationality = data.nationality;
        this.overall = data.overall;
        this.gameSense = data.gameSense;
        this.teamFighting = data.teamFighting;
        this.dueling = data.dueling;
        this.jglPathing = data.jglPathing;
        this.waveMgmt = data.waveMgmt;
        this.farming = data.farming;
        this.currentTeamUrl = data.currentTeamUrl;
        this.currentTeam = data.currentTeam;

        this.loading = false;
    }
}