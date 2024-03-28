import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import List from "./Models/List";
import PlayerMember from "./Models/PlayerMember";

export function usePlayerMembers(id: number, page: number = 0, pageSize: number = 10) {
    const [membersData, setMembersData] = useState(new List<PlayerMember>(PlayerMember));

    useEffect(() => {
        // Get members data from API
        axios.get(`${API.url}players/${id}/members?page=${page}&pageSize=${pageSize}`)
            .then(res => setMembersData(new List<PlayerMember>(PlayerMember, res.data)))
            .catch(err => console.error(err));
    }, [page, pageSize]);

    return membersData;
}