import ApiReturn from "./ApiReturn";

export default class Team extends ApiReturn {
    name: string;
    gamesUrl: string;
    players: string;
    flag: string;
    constructor(data = null) {
        super();
        if (data === null) return;
        this.name = data.name;
        this.gamesUrl = data.gamesUrl;
        this.players = data.players;
        this.flag = data.flag;
        this.loading = false;
    }
}