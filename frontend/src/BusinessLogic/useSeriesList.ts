import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import List from "./Models/List";
import Series from "./Models/Series";

export function useSeriesList(page: number = 0, pageSize: number = 10) {
    const [seriesData, setSeriesData] = useState(new List<Series>(Series));

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}series?page=${page}&pageSize=${pageSize}`)
            .then(res => setSeriesData(new List<Series>(Series, res.data)))
            .catch(err => console.error(err));
    }, [page, pageSize]);

    return seriesData;
}