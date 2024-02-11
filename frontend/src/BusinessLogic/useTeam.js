import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";

export function useTeam(id) {
    const [teamData, setTeamData] = useState({});

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}teams/${id}`)
            .then(res => setTeamData({
                
            }))
            .catch(err => console.error(err));
    }, []);

    return teamData;
}