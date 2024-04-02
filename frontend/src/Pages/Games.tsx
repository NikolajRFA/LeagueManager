import {FC, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import React from "react";
import usePaging from "../Hooks/usePaging";
import {useSeriesList} from "../BusinessLogic/useSeriesList";
import {useTitleContext} from "../Contexts/TitleContext";
import {CircularProgress, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import Utils from "../Utils";
import GamesGame from "./Games/GamesGame";
import Paging from "../Components/Paging";
import {useSeries} from "../BusinessLogic/useSeries";

const Games: FC = () => {
    const pageValues = [5, 10, 15];
    const [noPages, setNoPages] = useState(1);
    const [page, pageSize, handleNextClick, handlePrevClick, handleSelectChange] = usePaging(noPages, pageValues);
    const games = useSeriesList(page - 1, pageSize);
    const {setTitle} = useTitleContext();


    useEffect(() => {
        setTitle('Games');
    }, []);

    useEffect(() => {
        setNoPages(games.numberOfPages)
    }, [games]);

    return (
        games.loading ? <CircularProgress/> :
            <Container sx={{width: {xs: '100%', sm: '100%', md: '100%', lg: '75%', xl: '75%'}}}>
                <Stack spacing={2}
                       style={{marginBottom: '10px'}}
                >
                    {games.items.map(game =>
                        <NavLink to={`/games/${Utils.getLastIdFromUrl(game.url)}`}
                                 style={{textDecoration: 'none'}}>
                            <GamesGame game={game}/>
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

export default Games;