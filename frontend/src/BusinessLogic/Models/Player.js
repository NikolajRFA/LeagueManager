import ApiReturn from "./ApiReturn";

export default class Player extends ApiReturn{
    constructor(data = null) {
        console.log(data);
        super();
        if (data == null) return;
        console.log('Building player');
        const url = data.url;
        const firstName = data.firstName;
        const lastName = data.lastName;
        const alias = data.alias;
        const age = data.age;
        const gender = data.gender;
        const nationality = data.nationality;
        const gameSense = data.gameSense;
        const teamFighting = data.teamFighting;
        const dueling = data.dueling;
        const jglPathing = data.jglPathing;
        const waveMgmt = data.waveMgmt;
        const farming = data.farming;
        const activeTeamUrl = data.activeTeamUrl;
        const activeTeam = data.activeTeam;

        this.loading = true;
    }
}