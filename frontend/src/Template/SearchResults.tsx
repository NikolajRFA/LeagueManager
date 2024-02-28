import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";

export default function SearchResults({onMount}) {
    const [searchPhrase, setSearchPhrase] = useState("");

    useEffect(() => {
        onMount([searchPhrase, setSearchPhrase]);
    }, [onMount, searchPhrase]);

    return (
        searchPhrase !== "" && <Paper>
            {searchPhrase}
        </Paper>
    )
}