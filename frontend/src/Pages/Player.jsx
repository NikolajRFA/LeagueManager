import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Template from "../Template/Template";
import Chart from "./Dashboard/Chart";
import Deposits from "./Dashboard/Deposits";
import Games from "./Player/Games";
import {Avatar, Box, Button, Chip, LinearProgress, linearProgressClasses, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {usePlayer} from "../BusinessLogic/usePlayer";
import {styled} from "@mui/material/styles";
import Loading from "../Components/Loading";
import PersonIcon from '@mui/icons-material/Person';
import {useParams} from "react-router-dom";
import PlayerStats from "./Player/PlayerStats";
import PlayerInfo from "./Player/PlayerInfo";

// TODO: Add some way to see the players current team.
export default function Player() {
    const {id} = useParams();
    const playerData = usePlayer(id);
    const [chipState, setChipState] = useState('outlined')

    return (
        <Template title={`${playerData.firstName} '${playerData.alias}' ${playerData.lastName}`}>
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
                        <Games playerId={id}/>
                    </Paper>
                </Grid>
            </Grid>
        </Template>
    )
}