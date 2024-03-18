import React, {FC} from "react";
import Player from "../../BusinessLogic/Models/Player";
import {Avatar, Box, Card, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import API from "../../BusinessLogic/API";
import {Flag} from "../../Components/Flag";

interface PlayerProps {
    player: Player
}

const PlayersPlayer: FC<PlayerProps> = ({player}) => {
    const avatarSize: number = 40;

    return (
        <Card style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90px'}}>
            <Grid container>
                <Grid item lg={2}>
                    <Stack spacing={0.5} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Avatar variant='rounded' sx={{width: avatarSize, height: avatarSize}}
                                style={{marginTop: '8px'}}>
                            <PersonIcon/>
                        </Avatar>

                        <Flag country={player.nationality} width={48}/>
                    </Stack>

                </Grid>
                <Grid item lg={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                    <Stack spacing={0}>
                        <Typography variant='subtitle1'>
                            {player.firstName} '{player.alias}' {player.lastName}
                        </Typography>
                        <Typography variant='body2'>{player.age}</Typography>
                        <Typography variant='subtitle1'>
                            {player.currentTeam}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item lg={2} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Stack style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography variant='h5'>
                            Overall
                        </Typography>
                        <Typography variant='h5'>
                            {player.overall}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

export default PlayersPlayer;