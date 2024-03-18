import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import Player from "./Models/Player";
import List from "./Models/List";

export function usePlayers(orderBy: string = "", isAsc: boolean = true, page: number = 0, pageSize: number = 10) {
    const [playersData, setPlayersData] = useState(new List<Player>(Player));

    useEffect(() => {
        // Build order params
        const orderParams = `${!orderBy || !(orderBy === 'none') ? `order=${orderBy}&dir=${isAsc ? "asc" : "desc"}&` : ''}`;

        // Get player data from API
        axios.get(`${API.url}players?${orderParams}page=${page}&pageSize=${pageSize}`)
            .then(res => setPlayersData(new List<Player>(Player, res.data)))
            .catch(err => console.error(err));
    }, [orderBy, isAsc, page, pageSize]);

    return playersData;
}