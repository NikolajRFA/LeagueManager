import React, {useEffect, useState} from "react";
import {FC} from "react";
import {usePlayers} from "../BusinessLogic/usePlayers";
import {useTitleContext} from "../Contexts/TitleContext";
import {Button, CircularProgress, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Typography from "@mui/material/Typography";

const Players: FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const players = usePlayers(page - 1, pageSize);
    const {title, setTitle} = useTitleContext();

    useEffect(() => {
        setTitle('Players');
    }, []);

    const handleNextClick = () => {
        if (page === players.numberOfPages) return;
        setPage(page + 1);
    }

    const handlePrevClick = () => {
        if (page === 1) return;
        setPage(page - 1);
    }

    const handleSelectChange = (e: SelectChangeEvent) => {
        setPageSize(Number(e.target.value));
    }

    return (
        players.loading ? <CircularProgress/> :
            <>
                {players.items.map(item =>
                    <p>{item.firstName} '{item.alias}' {item.lastName}</p>)}
                <Button variant='contained' style={{marginRight: '10px'}}
                        onClick={handleNextClick}>
                    Next
                </Button>
                <Button variant='contained' style={{marginRight: '10px'}}
                        onClick={handlePrevClick}>
                    Prev
                </Button>
                <Select value={pageSize.toString()}
                        onChange={handleSelectChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                </Select>
                <Typography variant='subtitle1'>
                    Page {page} of {players.loading ? 1 : players.numberOfPages}
                </Typography>
            </>
    )
}

export default Players;