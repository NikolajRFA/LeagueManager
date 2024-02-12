import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";

export function useTeamMembers(id) {
    const [members, setMembers] = useState({});

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}teams/${id}/members`)
            .then(res => setMembers({
                total: res.data.total,
                numberOfPages: res.data.numberOfPages,
                next: res.data.next,
                prev: res.data.prev,
                current: res.data.current,
                items: res.data.items.map(item => ({
                    role: item.role,
                    fromDate: item.fromDate,
                    toDate: item.toDate,
                    url: item.url,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    alias: item.alias,
                    age: item.age,
                    gender: item.gender,
                    nationality: item.nationality,
                    gameSense: item.gameSense,
                    teamFighting: item.teamFighting,
                    dueling: item.dueling,
                    jglPathing: item.jglPathing,
                    waveMgmt: item.waveMgmt,
                    farming: item.farming,
                    activeTeamUrl: item.activeTeamUrl,
                    activeTeam: item.activeTeam
                }))
            }))
            .catch(err => console.error(err));
    }, []);

    return members;
}