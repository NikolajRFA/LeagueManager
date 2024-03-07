import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {Avatar, Box, Stack} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";

export default function PlayerSearchResult({player, isFirst = false}) {
    const avatarSize: number = 30;
    return (
        <Paper elevation={0}>
            <Grid container style={{marginTop: `${isFirst ? 8 : 0}px`}}>
                <Grid item lg={4} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Avatar variant='rounded' sx={{width: avatarSize, height: avatarSize}}>
                        <PersonIcon/>
                    </Avatar>
                </Grid>
                <Grid item lg={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant='subtitle2'>
                        {player.alias}
                    </Typography>
                </Grid>
                <Grid item lg={4} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Box
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        component="img"
                        alt={player.nationality}
                        src={`https://flagsapi.com/${player.nationality}/flat/32.png`}
                    />
                </Grid>
                <Grid item lg={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant='subtitle2'>
                        {player.currentTeam}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}