import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";

export default function SearchResults({onMount, searchRef, drawerWidth, drawerIsOpen}) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [width, setWidth] = useState(10);

    useEffect(() => {
        onMount([searchPhrase, setSearchPhrase]);
    }, [onMount, searchPhrase]);

    useEffect(() => {
        if (searchRef.current) {
            const rect = searchRef.current.getBoundingClientRect();

            //console.log(`left: ${drawerIsOpen ? rect.left - drawerWidth : rect.left}`);
            //console.log(`bottom: ${rect.bottom + 12}`);
            //console.log(`width: ${rect.width}`);

            setPosX(drawerIsOpen ? rect.left - drawerWidth : rect.left);
            setPosY(rect.bottom + 12);
            setWidth(rect.width);
        }
    }, [searchPhrase]);

    return (
        searchPhrase !== "" && <Paper
            style={{
                position: "absolute",
                top: `${posY}px`,
                left: `${posX}px`,
                width: `${width}px`
            }}>
            {searchPhrase}
        </Paper>
    )
}