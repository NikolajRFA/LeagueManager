import React, {useEffect, useState} from "react";
import {FC} from "react";
import {usePlayers} from "../BusinessLogic/usePlayers";
import {useTitleContext} from "../Contexts/TitleContext";
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paging from "../Components/Paging";
import PlayersPlayer from "./Players/PlayersPlayer";
import Container from "@mui/material/Container";
import {NavLink} from "react-router-dom";
import Utils from "../Utils";

const Players: FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [orderBy, setOrderBy] = useState('none');
    const [isAsc, setIsAsc] = useState(true);
    const players = usePlayers(orderBy, isAsc, page - 1, pageSize);
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

    const handleAscButtonClick = () => {
        setIsAsc(!isAsc);
    }

    const handleOrderSelectChange = (e: SelectChangeEvent) => {
        setOrderBy(e.target.value);
    }

    return (
        players.loading ? <CircularProgress/> :
            <Container sx={{width: {xs: '100%', sm: '100%', md: '100%', lg: '75%', xl: '75%'}}}>

                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Order By</InputLabel>
                    <Select labelId="demo-simple-select-helper-label"
                            value={orderBy}
                            onChange={handleOrderSelectChange}
                            label={'Order By'}

                            style={{marginBottom: '10px', marginRight: '10px', width: '100px'}}>
                        <MenuItem value='none'><em>None</em></MenuItem>
                        <MenuItem value='overall'>Overall</MenuItem>
                        <MenuItem value='age'>Age</MenuItem>
                    </Select>
                </FormControl>
                <Button variant='contained'
                        style={{marginBottom: '10px'}}
                        onClick={handleAscButtonClick}>
                    {isAsc ? "Ascending" : "Descending"}
                </Button>
                <Stack spacing={2}
                       style={{marginBottom: '10px'}}
                >
                    {players.items.map(player =>
                        <NavLink to={`/players/${Utils.getLastIdFromUrl(player.url)}`}
                                 style={{textDecoration: 'none'}}>
                            <PlayersPlayer player={player}/>
                        </NavLink>)}
                </Stack>
                <Paging onNextClick={handleNextClick}
                        onPrevClick={handlePrevClick}
                        onSelectChange={handleSelectChange}
                        selectDefaultValue={pageSize}
                        page={page}
                        numberOfPages={players.loading ? null : players.numberOfPages}
                />
            </Container>
    )
}

export default Players;