import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import List from "./Models/List";
import Game from "./Models/Game";

export function useGames(page: number = 0, pageSize: number = 10) {
    const [gameData, setGameData] = useState(new List<Game>(Game));

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}games?page=${page}&pageSize=${pageSize}`)
            .then(res => setGameData(new List<Game>(Game, res.data)))
            .catch(err => console.error(err));
    }, [page, pageSize]);

    return gameData;
}