import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {Avatar, Stack} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";

export default function PlayerSearchResult({player}) {
    const avatarSize: number = 30;
    return (
        <Paper elevation={0}>
            <Grid container style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Grid item lg={4} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Stack spacing={1}>
                        <Avatar variant='rounded' sx={{width: avatarSize, height: avatarSize, marginRight: '10px'}}>
                            <PersonIcon/>
                        </Avatar>
                        <p>
                            Flag
                        </p>
                    </Stack>
                </Grid>
                <Grid item lg={8}>
                    <Stack spacing={1}>
                        <Typography variant='subtitle2'>
                            {player.firstName} '{player.alias}' {player.lastName}
                        </Typography>
                        <Typography variant='subtitle2'>
                            {player.currentTeam}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}