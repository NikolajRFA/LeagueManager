import ApiReturn from "./ApiReturn";

export default class Team extends ApiReturn {
    name: string;
    gamesUrl: string;
    players: string;
    constructor(data = null) {
        super();
        if (data === null) return;
        this.name = data.name;
        this.gamesUrl = data.gamesUrl;
        this.players = data.players;
        this.loading = false;
    }
}