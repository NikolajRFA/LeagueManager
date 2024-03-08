import {useEffect, useState} from "react";
import axios from "axios";
import API from "./API";
import List from "./Models/List";
import GamePlayer from "./Models/GamePlayer";

export default function useGamePlayers(id: number) {
    const [gamePlayers, setGamePlayers] = useState(new List<GamePlayer>(GamePlayer));

    useEffect(() => {
        // Get player game data from API
        axios.get(`${API.url}games/${id}/players`)
            .then(res => setGamePlayers(new List(GamePlayer, res.data)))
            .catch(err => console.error(err));
    }, []);

    return gamePlayers;
}