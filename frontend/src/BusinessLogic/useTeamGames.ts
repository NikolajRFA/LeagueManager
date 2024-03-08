import {useEffect, useState} from "react";
import axios from "axios";
import API from "./API";
import TeamGames from "./Models/TeamGames";
import List from "./Models/List";

export default function useTeamGames(id: number) {
    const [teamGamesData, setTeamGamesData] = useState(new List<TeamGames>(TeamGames));

    useEffect(() => {
        // Get player game data from API
        axios.get(`${API.url}teams/${id}/games`)
            .then(res => setTeamGamesData(new List<TeamGames>(TeamGames, res.data)))
            .catch(err => console.error(err));
    }, []);

    return teamGamesData;
}