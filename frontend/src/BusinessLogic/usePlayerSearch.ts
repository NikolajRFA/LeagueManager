import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import Team from "./Models/Team";
import PlayerSearchResult from "./Models/PlayerSearchResult";
import List from "./Models/List";

export function usePlayerSearch(searchPhrase: string) {
    const [searchData, setSearchData] = useState(new List<PlayerSearchResult>(PlayerSearchResult));

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}search/players?search=${searchPhrase}&page=0&pageSize=3`)
            .then(res => setSearchData(new List<PlayerSearchResult>(PlayerSearchResult, res.data)))
            .catch(err => console.error(err));
    }, [searchPhrase]);

    return searchData;
}