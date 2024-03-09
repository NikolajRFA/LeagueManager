import {NavLink, useParams} from "react-router-dom";
import Template from "../Template/Template";
import Grid from "@mui/material/Grid";
import {useGame} from "../BusinessLogic/useGame";
import {useEffect} from "react";
import Paper from "@mui/material/Paper";
import {CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Players from "./Game/Players";
import useGamePlayers from "../BusinessLogic/useGamePlayers";
import Team from "./Game/Team";
import React from "react";
import {useTitleContext} from "../Contexts/TitleContext";

export default function Game() {
    const {id} = useParams();
    const gameData = useGame(Number(id));
    const gamePlayers = useGamePlayers(Number(id));
    const { title, setTitle } = useTitleContext();

    useEffect(() => {
        setTitle(`${gameData.blueSide} vs. ${gameData.redSide}`);
    }, [gameData]);

    return (
        gameData.loading ? <CircularProgress/> :
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
                    {gameData.blueSideUrl ? <Team gameData={gameData} isBlueSide={true}/> : <CircularProgress/>}
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
                                {gameData.event}
                            </Typography>
                            <Typography variant="h6">
                                Winner: {gameData.winner}
                            </Typography>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    {gameData.redSideUrl ? <Team gameData={gameData} isBlueSide={false}/> : <CircularProgress/>}
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