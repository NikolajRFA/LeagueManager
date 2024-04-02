import {useEffect, useState} from "react";
import axios from "axios";
import API from "./API";
import PlayerSeries from "./Models/PlayerSeries";
import List from "./Models/List";

export default function usePlayerSeries(id: number) {
    const [playerSeriesData, setPlayerSeriesData] = useState(new List<PlayerSeries>(PlayerSeries));

    useEffect(() => {
        // Get player game data from API
        axios.get(`${API.url}players/${id}/games`)
            .then(res => setPlayerSeriesData(new List<PlayerSeries>(PlayerSeries, res.data)))
            .catch(err => console.error(err));
    }, []);

    return playerSeriesData;
}