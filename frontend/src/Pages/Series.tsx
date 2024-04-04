import {FC, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import React from "react";
import usePaging from "../Hooks/usePaging";
import {useSeriesList} from "../BusinessLogic/useSeriesList";
import {useTitleContext} from "../Contexts/TitleContext";
import {CircularProgress, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import Utils from "../Utils";
import SeriesGame from "./Series/SeriesGame";
import Paging from "../Components/Paging";
import {useSeries} from "../BusinessLogic/useSeries";

const Series: FC = () => {
    const pageValues = [5, 10, 15];
    const [noPages, setNoPages] = useState(1);
    const [page, pageSize, handleNextClick, handlePrevClick, handleSelectChange] = usePaging(noPages, pageValues);
    const games = useSeriesList(page - 1, pageSize);
    const {setTitle} = useTitleContext();


    useEffect(() => {
        setTitle('Series');
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
                        <NavLink to={`/series/${Utils.getLastIdFromUrl(game.url)}`}
                                 style={{textDecoration: 'none'}}>
                            <SeriesGame game={game}/>
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

export default Series;