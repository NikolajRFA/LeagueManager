import {useEffect, useState} from "react";
import axios from "axios";
import API from "./API";
import TeamSeries from "./Models/TeamSeries";
import List from "./Models/List";

export default function useTeamGames(id: number) {
    const [teamGamesData, setTeamGamesData] = useState(new List<TeamSeries>(TeamSeries));

    useEffect(() => {
        // Get player game data from API
        axios.get(`${API.url}teams/${id}/games`)
            .then(res => setTeamGamesData(new List<TeamSeries>(TeamSeries, res.data)))
            .catch(err => console.error(err));
    }, []);

    return teamGamesData;
}