import {useEffect, useState} from "react";
import axios from "axios";
import API from "./API";

export default function usePlayerGames(id) {
    const [playerGamesData, setPlayerGamesData] = useState({});

    useEffect(() => {
        // Get player game data from API
        axios.get(`${API.url}players/${id}/games`)
            .then(res => setPlayerGamesData({
                total: res.data.total,
                numberOfPages: res.data.numberOfPages,
                next: res.data.next,
                prev: res.data.prev,
                current: res.data.current,
                items: res.data.items.map(item => ({
                    gameUrl: item.gameUrl,
                    playerUrl: item.playerUrl,
                    role: item.role,
                    teamUrl: item.teamUrl,
                    team: item.team,
                    versusUrl: item.versusUrl,
                    versus: item.versus,
                    winnerUrl: item.winnerUrl,
                    winner: item.winner,
                    won: item.won,
                    date: item.date
                }))
            }))
            .catch(err => console.error(err));
    }, []);

    return playerGamesData;
}