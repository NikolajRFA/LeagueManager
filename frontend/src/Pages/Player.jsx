import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Template from "../Template/Template";
import Chart from "./Dashboard/Chart";
import Deposits from "./Dashboard/Deposits";
import Orders from "./Dashboard/Orders";
import {Avatar, Box, Button, Chip, LinearProgress, linearProgressClasses, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {usePlayer} from "../BusinessLogic/usePlayer";
import {styled} from "@mui/material/styles";
import Loading from "../Components/Loading";
import PersonIcon from '@mui/icons-material/Person';
import {useParams} from "react-router-dom";
import PlayerStats from "./Player/PlayerStats";
import PlayerInfo from "./Player/PlayerInfo";

export default function Player() {
    const {id} = useParams();
    const playerData = usePlayer(id);
    const [chipState, setChipState] = useState('outlined')

    const handleChipClick = () => {
        if (chipState === 'outlined') {
            setChipState('filled');
        } else if (chipState === 'filled') {
            setChipState('outlined');
        }
    }

    const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));


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
                        <Orders/>
                    </Paper>
                </Grid>
            </Grid>
        </Template>
    )
}