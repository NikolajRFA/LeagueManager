import ApiReturn from "./ApiReturn";
import TeamGames from "./TeamGames";

export default class PlayerGame extends TeamGames {
    playerUrl: string;
    role: string;

    constructor(data = null) {
        super(data);
        if(data === null) return;
        this.playerUrl = data.playerUrl;
        this.role = data.role;
        this.loading = false;
    }
}