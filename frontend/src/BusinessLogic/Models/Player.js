import ApiReturn from "./ApiReturn";

export default class Player extends ApiReturn{
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
        this.gameSense = data.gameSense;
        this.teamFighting = data.teamFighting;
        this.dueling = data.dueling;
        this.jglPathing = data.jglPathing;
        this.waveMgmt = data.waveMgmt;
        this.farming = data.farming;
        this.activeTeamUrl = data.activeTeamUrl;
        this.activeTeam = data.activeTeam;

        this.loading = true;
    }
}