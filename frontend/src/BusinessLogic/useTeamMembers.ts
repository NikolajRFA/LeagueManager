import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import TeamMember from "./Models/TeamMember";
import List from "./Models/List";

export function useTeamMembers(id: string, current: boolean = false) {
    const [members, setMembers] = useState(new List(TeamMember));

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}teams/${id}/members${current ? "/current" : ""}`)
            .then(res => setMembers(new List<TeamMember>(TeamMember, res.data)))
            .catch(err => console.error(err));
    }, []);

    return members;
}