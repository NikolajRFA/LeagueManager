import {FC, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import React from "react";
import usePaging from "../Hooks/usePaging";
import {useSeriesList} from "../BusinessLogic/useSeriesList";
import {useTitleContext} from "../Contexts/TitleContext";
import {CircularProgress, Stack} from "@mui/material";
import {NavLink} from "react-router-dom";
import Utils from "../Utils";
import SeriesSingleSeries from "./Series/SeriesSingleSeries";
import Paging from "../Components/Paging";

const Series: FC = () => {
    const pageValues = [5, 10, 15];
    const [noPages, setNoPages] = useState(1);
    const [page, pageSize, handleNextClick, handlePrevClick, handleSelectChange] = usePaging(noPages, pageValues);
    const series = useSeriesList(page - 1, pageSize);
    const {setTitle} = useTitleContext();


    useEffect(() => {
        setTitle('Series');
    }, []);

    useEffect(() => {
        setNoPages(series.numberOfPages)
    }, [series]);

    return (
        series.loading ? <CircularProgress/> :
            <Container sx={{width: {xs: '100%', sm: '100%', md: '100%', lg: '75%', xl: '75%'}}}>
                <Stack spacing={2}
                       style={{marginBottom: '10px'}}
                >
                    {series.items.map(thisSeries =>
                        <NavLink to={`/series/${Utils.getLastIdFromUrl(thisSeries.url)}`}
                                 style={{textDecoration: 'none'}}>
                            <SeriesSingleSeries game={thisSeries}/>
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