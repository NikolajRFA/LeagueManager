import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import Game from "./Models/Game";

export function useGame(id: number) {
    const [game, setGame] = useState(new Game());

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}games/${id}`)
            .then(res => setGame(new Game(res.data)))
            .catch(err => console.error(err));
    }, []);

    return game;
}