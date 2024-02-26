import Player from "./Player";

export default class TeamMember extends Player {
    role: string;
    fromDate: Date;
    toDate: Date;

    constructor(data = null) {
        super(data);
        this.role = data.role;
        this.fromDate = data.fromDate;
        this.toDate = data.toDate;
        this.loading = false;
    }
}