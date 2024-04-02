import ApiReturn from "./ApiReturn";

export default class Game extends ApiReturn {
    url: string;
    seriesUrl: string;
    blueSideWon: boolean;

    constructor(data = null) {
        super();
        if (data === null) return;
        this.url = data.url;
        this.seriesUrl = data.seriesUrl;
        this.blueSideWon = data.blueSideWon;

        this.loading = false;
    }
}