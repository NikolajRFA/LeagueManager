import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Template from "../Template/Template";
import Games from "../Components/Games";
import {useEffect, useState} from "react";
import {usePlayer} from "../BusinessLogic/usePlayer";
import {useParams} from "react-router-dom";
import PlayerStats from "./Player/PlayerStats";
import PlayerInfo from "./Player/PlayerInfo";
import usePlayerGames from "../BusinessLogic/usePlayerGames";
import React from "react";
import {CircularProgress} from "@mui/material";
import {useTitleContext} from "../Contexts/TitleContext";

export default function Player() {
    const {id} = useParams();
    const playerData = usePlayer(Number(id));
    const playerGames = usePlayerGames(Number(id));
    const { title, setTitle } = useTitleContext();

    useEffect(() => {
        setTitle(`${playerData.firstName} '${playerData.alias}' ${playerData.lastName}`)
    }, [playerData]);

    return (
        playerData.loading ? <CircularProgress/> :
            <Grid container spacing={3}>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <PlayerInfo player={playerData}/>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <PlayerStats player={playerData}/>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Games games={playerGames} isPlayer={true}/>
                    </Paper>
                </Grid>
            </Grid>
    )
}