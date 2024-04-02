import ApiReturn from "./ApiReturn";

export default class TeamSeries extends ApiReturn {
    gameUrl: string;
    teamUrl: string;
    team: string;
    versusUrl: string;
    versus: string;
    winnerUrl: string;
    winner: string;
    won: boolean;
    event: string;
    eventUrl: string;
    date: Date;

    constructor(data = null) {
        super();
        if (data === null) return;
        this.gameUrl = data.gameUrl;
        this.teamUrl = data.teamUrl;
        this.team = data.team;
        this.versusUrl = data.versusUrl;
        this.versus = data.versus;
        this.winnerUrl = data.winnerUrl;
        this.winner = data.winner;
        this.won = data.won;
        this.event = data.event;
        this.eventUrl = data.eventUrl;
        this.date = data.date;
        this.loading = false;
    }
}