import React, {useEffect, useState} from "react";

export default function SearchResults({onMount}) {
    const [searchPhrase, setSearchPhrase] = useState("");

    useEffect(() => {
        onMount([searchPhrase, setSearchPhrase]);
    }, [onMount, searchPhrase]);

    return (
        searchPhrase !== "" && <p>Test</p>
    )
}