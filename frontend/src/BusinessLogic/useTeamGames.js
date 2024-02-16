import {useEffect, useState} from "react";
import axios from "axios";
import API from "./API";

export default function useTeamGames(id) {
    const [teamGamesData, setTeamGamesData] = useState({});

    useEffect(() => {
        // Get player game data from API
        axios.get(`${API.url}teams/${id}/games`)
            .then(res => setTeamGamesData({
                total: res.data.total,
                numberOfPages: res.data.numberOfPages,
                next: res.data.next,
                prev: res.data.prev,
                current: res.data.current,
                items: res.data.items.map(item => ({
                    gameUrl: item.gameUrl,
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

    return teamGamesData;
}