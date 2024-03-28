import ApiReturn from "./ApiReturn";

export default class PlayerMember extends ApiReturn {
    playerUrl: string;
    teamUrl: string;
    teamName: string;
    stay: number;
    role: string;
    fromDate: Date;
    toDate: Date;

    constructor(data = null) {
        super();
        this.playerUrl = data.playerUrl;
        this.teamUrl = data.teamUrl;
        this.teamName = data.teamName;
        this.stay = data.stay;
        this.role = data.role;
        this.fromDate = data.fromDate;
        this.toDate = data.toDate;

        this.loading = false;
    }
}