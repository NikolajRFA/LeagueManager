import {useEffect, useState} from "react";
import axios from "axios";
import API from "./API";
import List from "./Models/List";
import SeriesPlayer from "./Models/SeriesPlayer";

export default function useSeriesPlayers(id: number) {
    const [gamePlayers, setGamePlayers] = useState(new List<SeriesPlayer>(SeriesPlayer));

    useEffect(() => {
        // Get player game data from API
        axios.get(`${API.url}series/${id}/players`)
            .then(res => setGamePlayers(new List(SeriesPlayer, res.data)))
            .catch(err => console.error(err));
    }, []);

    return gamePlayers;
}