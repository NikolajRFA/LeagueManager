import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {CircularProgress, Stack} from "@mui/material";
import Divider from "@mui/material/Divider";
import PlayerSearchResult from "../Components/PlayerSearchResult";
import {usePlayerSearch} from "../BusinessLogic/usePlayerSearch";

export default function SearchResults({onMount, searchRef, drawerWidth, drawerIsOpen}) {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [show, setShow] = useState(false);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [width, setWidth] = useState(10);
    const playerSearchData = usePlayerSearch(searchPhrase);

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
            setPosY(rect.bottom + 12.5);
            setWidth(rect.width);
        }
    }, [searchPhrase, drawerIsOpen]);

    const handleFocus = (e) => {
        setTimeout(function () {
            setShow(true);
        }, 300);

    };

    const handleBlur = (e) => {
        setTimeout(function () {
            setShow(false);
        }, 100);
    }

    return (
        searchPhrase !== "" && show &&
        <Paper style={{
            position: "absolute",
            top: `${posY}px`,
            left: `${posX}px`,
            width: `${width}px`
        }}>
            <Stack spacing={1}
                   divider={<Divider/>}>
                {playerSearchData.loading ? <CircularProgress/> :
                    playerSearchData.items.map((item, index) => (
                        <PlayerSearchResult isFirst={index === 0}
                                            isLast={index === playerSearchData.items.length - 1}
                                            player={item}
                                            key={item.url}/>))}
            </Stack>
        </Paper>
    )
}