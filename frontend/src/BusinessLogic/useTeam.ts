import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import Team from "./Models/Team";

export function useTeam(id: string) {
    const [teamData, setTeamData] = useState(new Team());

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}teams/${id}`)
            .then(res => setTeamData(new Team(res.data)))
            .catch(err => console.error(err));
    }, []);

    return teamData;
}