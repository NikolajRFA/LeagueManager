import {NavLink, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useSeries} from "../BusinessLogic/useSeries";
import {useEffect} from "react";
import Paper from "@mui/material/Paper";
import {CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Players from "./Game/Players";
import useSeriesPlayers from "../BusinessLogic/useSeriesPlayers";
import Team from "./Game/Team";
import React from "react";
import {useTitleContext} from "../Contexts/TitleContext";

export default function Game() {
    const {id} = useParams();
    const seriesData = useSeries(Number(id));
    const gamePlayers = useSeriesPlayers(Number(id));
    const { title, setTitle } = useTitleContext();

    useEffect(() => {
        setTitle(`${seriesData.blueSide} vs. ${seriesData.redSide}`);
    }, [seriesData]);

    // TODO: Add games table and score
    return (
        seriesData.loading ? <CircularProgress/> :
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
                    {seriesData.blueSideUrl ? <Team gameData={seriesData} isBlueSide={true}/> : <CircularProgress/>}
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper>
                        <Stack spacing={3}
                               sx={{
                                   p: 2,
                                   display: 'flex',
                                   flexDirection: 'column',
                                   height: 240,
                                   alignItems: 'center',
                                   justifyContent: 'center'
                               }}
                        >
                            <Typography variant="h4">
                                {seriesData.event}
                            </Typography>
                            <Typography variant="h6">
                                Winner: {seriesData.winner}
                            </Typography>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    {seriesData.redSideUrl ? <Team gameData={seriesData} isBlueSide={false}/> : <CircularProgress/>}
                </Grid>
                <Grid item xs={12} md={4} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            //height: 240,
                            alignItems: 'left',
                            justifyContent: 'center'
                        }}
                    >
                        {!gamePlayers.loading ?
                            <Players players={gamePlayers.items.filter(item => item.side === "Blue").sort((a, b) => {
                                const roleOrder = {
                                    "top": 1,
                                    "jungle": 2,
                                    "mid": 3,
                                    "support": 4,
                                    "bottom": 5
                                };
                                return roleOrder[a.role] - roleOrder[b.role];
                            })}
                                     isBlueSide={true}/> : <CircularProgress/>}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            //height: 240,
                            alignItems: 'left',
                            justifyContent: 'center'
                        }}
                    >
                        {!gamePlayers.loading ?
                            <Players players={gamePlayers.items.filter(item => item.side === "Red").sort((a, b) => {
                                const roleOrder = {
                                    "top": 1,
                                    "jungle": 2,
                                    "mid": 3,
                                    "support": 4,
                                    "bottom": 5
                                };
                                return roleOrder[a.role] - roleOrder[b.role];
                            })}
                                     isBlueSide={false}/> : <CircularProgress/>}
                    </Paper>
                </Grid>
            </Grid>
    )
}