import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import Player from "./Models/Player";

export function usePlayer(id: number) {
    const [playerData, setPlayerData] = useState(new Player());

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}players/${id}`)
            .then(res => setPlayerData(new Player(res.data)))
            .catch(err => console.error(err));
    }, [id]);

    return playerData;
}