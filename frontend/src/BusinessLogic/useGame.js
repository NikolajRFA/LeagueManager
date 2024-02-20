import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";

export function useGame(id) {
    const [playerData, setPlayerData] = useState({});

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}games/${id}`)
            .then(res => setPlayerData({
                url: res.data.url,
                blueSide: res.data.blueSide,
                blueSideUrl: res.data.blueSideUrl,
                redSide: res.data.redSide,
                redSideUrl: res.data.redSideUrl,
                winner: res.data.winner,
                winnerUrl: res.data.winnerUrl,
                event: res.data.event,
                eventUrl: res.data.eventUrl,
                date: res.data.date
            }))
            .catch(err => console.error(err));
    }, []);

    return playerData;
}