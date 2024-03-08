import {useEffect, useState} from "react";
import axios from "axios";
import API from "./API";
import PlayerGame from "./Models/PlayerGame";
import List from "./Models/List";

export default function usePlayerGames(id: number) {
    const [playerGamesData, setPlayerGamesData] = useState(new List<PlayerGame>(PlayerGame));

    useEffect(() => {
        // Get player game data from API
        axios.get(`${API.url}players/${id}/games`)
            .then(res => setPlayerGamesData(new List<PlayerGame>(PlayerGame, res.data)))
            .catch(err => console.error(err));
    }, []);

    return playerGamesData;
}