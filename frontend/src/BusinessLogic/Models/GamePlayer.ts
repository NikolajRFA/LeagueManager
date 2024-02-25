import ApiReturn from "./ApiReturn";

export default class GamePlayer extends ApiReturn {
    playerUrl: string;
    team: string;
    teamUrl: string;
    side: string;
    firstName: string;
    lastName: string;
    alias: string;
    role: string;

    constructor(data = null) {
        super();
        this.playerUrl = data.playerUrl;
        this.team = data.team;
        this.teamUrl = data.teamUrl;
        this.side = data.side;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.alias = data.alias;
        this.role = data.role;
    }
}