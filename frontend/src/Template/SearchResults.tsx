import React, {useEffect, useState} from "react";

export default function SearchResults({searchPhrase}) {
    const [showSearchResults, setShowSearchResults] = useState(searchPhrase !== "");
    console.log(showSearchResults)

    useEffect(() => {

    }, [searchPhrase]);

    return (
        showSearchResults && <p>Test</p>
    )
}