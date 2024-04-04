import ApiReturn from "./ApiReturn";
import Game from "./Game";

export default class Series extends ApiReturn {
    url: string;
    blueSide: string;
    blueSideUrl: string;
    redSide: string;
    redSideUrl: string;
    bestOf: number;
    winner: string;
    winnerUrl: string;
    event: string;
    eventUrl: string;
    date: Date;
    games: Game[];

    constructor(data = null) {
        super();
        if (data === null) return;
        this.url = data.url;
        this.blueSide = data.blueSide;
        this.blueSideUrl = data.blueSideUrl;
        this.redSide = data.redSide;
        this.redSideUrl = data.redSideUrl;
        this.bestOf = data.bestOf;
        this.winner = data.winner;
        this.winnerUrl = data.winnerUrl;
        this.event = data.event;
        this.eventUrl = data.eventUrl;
        this.date = data.date;
        this.games = data.games.map(game => new Game(game));

        this.loading = false;
    }


}