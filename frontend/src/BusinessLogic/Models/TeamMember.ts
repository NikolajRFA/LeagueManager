import ApiReturn from "./ApiReturn";

export default class TeamMember extends ApiReturn {
    role: string;
    fromDate: Date;
    toDate: Date;
    url: string;
    firstName: string;
    lastName: string;
    alias: string;
    age: number;
    gender: string;
    nationality: string;
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
        this.role = data.role;
        this.fromDate = data.fromDate;
        this.toDate = data.toDate;
        this.url = data.url;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.alias = data.alias;
        this.age = data.age;
        this.gender = data.gender;
        this.nationality = data.nationality;
        this.gameSense = data.gameSense;
        this.teamFighting = data.teamFighting;
        this.dueling = data.dueling;
        this.jglPathing = data.jglPathing;
        this.waveMgmt = data.waveMgmt;
        this.farming = data.farming;
        this.currentTeamUrl = data.currentTeamUrl;
        this.currentTeam = data.currentTeam;
    }
}