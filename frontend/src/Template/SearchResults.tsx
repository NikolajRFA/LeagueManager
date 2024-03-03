import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";

export default function SearchResults({onMount, searchRef, drawerWidth, drawerIsOpen}) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [show, setShow] = useState(false);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [width, setWidth] = useState(10);

    useEffect(() => {
        onMount([searchPhrase, setSearchPhrase, handleFocus, handleBlur]);
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
    }, [searchPhrase, drawerIsOpen]);

    const handleFocus = (e) => {
        setTimeout(function() {
            console.log('handleFocus')
            setShow(true);
        }, 300);

    };

    const handleBlur = (e) => {
        console.log('handleBlur');
        setShow(false);
    }

    return (
        searchPhrase !== "" && show && <Paper
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