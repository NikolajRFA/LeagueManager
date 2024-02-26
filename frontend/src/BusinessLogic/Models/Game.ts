import ApiReturn from "./ApiReturn";

export default class Game extends ApiReturn {
    url: string;
    blueSide: string;
    blueSideUrl: string;
    redSide: string;
    redSideUrl: string;
    winner: string;
    winnerUrl: string;
    event: string;
    eventUrl: string;
    date: Date;

    constructor(data = null) {
        super();
        if (data === null) return;
        this.url = data.url;
        this.blueSide = data.blueSide;
        this.blueSideUrl = data.blueSideUrl;
        this.redSide = data.redSide;
        this.redSideUrl = data.redSideUrl;
        this.winner = data.winner;
        this.winnerUrl = data.winnerUrl;
        this.event = data.event;
        this.eventUrl = data.eventUrl;
        this.date = data.date;
        this.loading = false;
    }
}