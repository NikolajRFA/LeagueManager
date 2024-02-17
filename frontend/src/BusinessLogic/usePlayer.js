import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";

export function usePlayer(id) {
    const [playerData, setPlayerData] = useState({});

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}players/${id}`)
            .then(res => setPlayerData({
                url: res.data.url,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                alias: res.data.alias,
                age: res.data.age,
                gender: res.data.gender,
                nationality: res.data.nationality,
                gameSense: res.data.gameSense,
                teamFighting: res.data.teamFighting,
                dueling: res.data.dueling,
                jglPathing: res.data.jglPathing,
                waveMgmt: res.data.waveMgmt,
                farming: res.data.farming,
                currentTeamUrl: res.data.currentTeamUrl,
                currentTeam: res.data.currentTeam
            }))
            .catch(err => console.error(err));
    }, []);

    console.log(playerData);
    return playerData;
}