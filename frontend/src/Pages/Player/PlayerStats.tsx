import Grid from "@mui/material/Grid";
import Loading from "../../Components/Loading";
import {Box, LinearProgress, Typography} from "@mui/material";
import React from "react";

export default function PlayerStats({player}) {

    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{width: '100%', mr: 1}}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{minWidth: 35}}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Grid container>
            <Grid item xs={6} md={6} lg={6}>
                <Loading isLoading={!player.gameSense}>
                    <Typography variant="body2" color="text.secondary">Game Sense</Typography>
                    <LinearProgressWithLabel value={player.gameSense}/>
                </Loading>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <Loading isLoading={!player.teamFighting}>
                    <Typography variant="body2" color="text.secondary">Team Fighting</Typography>
                    <LinearProgressWithLabel value={player.teamFighting}/>
                </Loading>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <Loading isLoading={!player.dueling}>
                    <Typography variant="body2" color="text.secondary">Dueling</Typography>
                    <LinearProgressWithLabel value={player.dueling}/>
                </Loading>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <Loading isLoading={!player.jglPathing}>
                    <Typography variant="body2" color="text.secondary">Jungle Pathing</Typography>
                    <LinearProgressWithLabel value={player.jglPathing}/>
                </Loading>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <Loading isLoading={!player.waveMgmt}>
                    <Typography variant="body2" color="text.secondary">Wave Management</Typography>
                    <LinearProgressWithLabel value={player.waveMgmt}/>
                </Loading>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
                <Loading isLoading={!player.farming}>
                    <Typography variant="body2" color="text.secondary">Farming</Typography>
                    <LinearProgressWithLabel value={player.farming}/>
                </Loading>
            </Grid>
        </Grid>
    )
}