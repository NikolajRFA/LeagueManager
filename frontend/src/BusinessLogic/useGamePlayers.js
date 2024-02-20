import {useEffect, useState} from "react";
import axios from "axios";
import API from "./API";

export default function useGamePlayers(id) {
    const [gamePlayers, setGamePlayers] = useState({});

    useEffect(() => {
        // Get player game data from API
        axios.get(`${API.url}games/${id}/players`)
            .then(res => setGamePlayers({
                total: res.data.total,
                numberOfPages: res.data.numberOfPages,
                next: res.data.next,
                prev: res.data.prev,
                current: res.data.current,
                items: res.data.items.map(item => ({
                    playerUrl: item.playerUrl,
                    team: item.team,
                    teamUrl: item.teamUrl,
                    side: item.side,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    alias: item.alias,
                    role: item.role
                }))
            }))
            .catch(err => console.error(err));
    }, []);

    return gamePlayers;
}