import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";

export function usePlayer() {
    const [playerData, setPlayerData] = useState([]);

    useEffect(() => {
        // Get player data from API
        // TODO: Handle api response properly
        axios.get(`${API.url}players/1`)
            .then(res => setPlayerData(res.data))
            .catch(err => console.error(err));
        console.log(playerData);
    }, []);

    return playerData;
}