import ApiReturn from "./ApiReturn";
import TeamSeries from "./TeamSeries";

export default class PlayerSeries extends TeamSeries {
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