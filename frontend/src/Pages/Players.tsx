import React, {useEffect, useState} from "react";
import {FC} from "react";
import {usePlayers} from "../BusinessLogic/usePlayers";
import {useTitleContext} from "../Contexts/TitleContext";
import {Button, CircularProgress, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paging from "../Components/Paging";

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
                <Paging onNextClick={handleNextClick}
                        onPrevClick={handlePrevClick}
                        onSelectChange={handleSelectChange}
                        selectDefaultValue={pageSize}
                        page={page}
                        numberOfPages={players.loading ? null : players.numberOfPages}
                />
            </>
    )
}

export default Players;