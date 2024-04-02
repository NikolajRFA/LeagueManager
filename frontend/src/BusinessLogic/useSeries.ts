import {useState, useEffect} from "react";
import axios from "axios";
import API from "./API";
import Game from "./Models/Game";
import Series from "./Models/Series";

export function useSeries(id: number): Series {
    const [series, setSeries] = useState(new Series());

    useEffect(() => {
        // Get player data from API
        axios.get(`${API.url}series/${id}`)
            .then(res => setSeries(new Series(res.data)))
            .catch(err => console.error(err));
    }, []);

    return series;
}