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
import Paging from "../Components/Paging";
import PlayersPlayer from "./Players/PlayersPlayer";
import Container from "@mui/material/Container";
import {NavLink} from "react-router-dom";
import Utils from "../Utils";
import usePaging from "../Hooks/usePaging";

const Players: FC = () => {
    const [orderBy, setOrderBy] = useState('overall');
    const [isAsc, setIsAsc] = useState(false);
    const pageValues: number[] = [5, 10, 15];
    const [noPages, setNoPages] = useState(1);
    const [page, pageSize, handleNextClick, handlePrevClick, handleSelectChange] = usePaging(noPages, pageValues);
    const players = usePlayers(orderBy, isAsc, page - 1, pageSize);

    const {setTitle} = useTitleContext();

    useEffect(() => {
        setTitle('Players');
    }, []);

    useEffect(() => {
        setNoPages(players.numberOfPages);
    }, [players]);

    const handleAscButtonClick = () => {
        setIsAsc(!isAsc);
    }

    const handleOrderSelectChange = (e: SelectChangeEvent) => {
        setOrderBy(e.target.value);
    }

    return (
        players.loading ? <CircularProgress/> :
            <Container sx={{width: {xs: '100%', sm: '100%', md: '100%', lg: '75%', xl: '75%'}}}>

                <FormControl size='small'>
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
                        style={{marginBottom: '10px', height: '40px'}}
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
                        selectValues={pageValues}
                        selectDefaultValue={pageSize}
                        page={page}
                        numberOfPages={noPages}
                />
            </Container>
    )
}

export default Players;