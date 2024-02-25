import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import TeamMember from "./Models/TeamMember";
import List from "./Models/List";

export function useTeamMembers(id, current = false) {
    const [members, setMembers] = useState({});

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}teams/${id}/members${current ? "/current" : ""}`)
            .then(res => setMembers(new List<TeamMember>())
            }))
            .catch(err => console.error(err));
    }, []);

    return members;
}