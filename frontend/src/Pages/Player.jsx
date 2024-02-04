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
                        {/*<Chart />*/}
                        <Stack spacing={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Avatar variant='rounded' sx={{width: 50, height: 50, marginRight: '10px'}}>
                                <PersonIcon/>
                            </Avatar>
                            <Stack spacing={0} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography variant="subtitle1">
                                    {playerData.firstName} '{playerData.alias}' {playerData.lastName}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {playerData.age}
                                </Typography>
                            </Stack>
                            <Loading isLoading={!playerData.nationality}>
                                <Box
                                    component="img"
                                    /*sx={{
                                        height: 233,
                                        width: 350,
                                        maxHeight: { xs: 233, md: 167 },
                                        maxWidth: { xs: 350, md: 250 },
                                    }}*/
                                    alt={playerData.nationality}
                                    src={`https://flagsapi.com/${playerData.nationality}/flat/48.png`}
                                />
                            </Loading>
                            {/*<Chip label="I am a chip, click me!" variant={chipState} color="success"
                                  onClick={handleChipClick}/>*/}
                        </Stack>
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
                        <Grid container>
                            <Grid item xs={6} md={6} lg={6}>
                                <Loading isLoading={!playerData.gameSense}>
                                    <Typography variant="body2" color="text.secondary">Game Sense</Typography>
                                    <LinearProgressWithLabel value={playerData.gameSense}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Loading isLoading={!playerData.teamFighting}>
                                    <Typography variant="body2" color="text.secondary">Team Fighting</Typography>
                                    <LinearProgressWithLabel value={playerData.teamFighting}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Loading isLoading={!playerData.dueling}>
                                    <Typography variant="body2" color="text.secondary">Dueling</Typography>
                                    <LinearProgressWithLabel value={playerData.dueling}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Loading isLoading={!playerData.jglPathing}>
                                    <Typography variant="body2" color="text.secondary">Jungle Pathing</Typography>
                                    <LinearProgressWithLabel value={playerData.jglPathing}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Loading isLoading={!playerData.waveMgmt}>
                                    <Typography variant="body2" color="text.secondary">Wave Management</Typography>
                                    <LinearProgressWithLabel value={playerData.waveMgmt}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Loading isLoading={!playerData.farming}>
                                    <Typography variant="body2" color="text.secondary">Farming</Typography>
                                    <LinearProgressWithLabel value={playerData.farming}/>
                                </Loading>
                            </Grid>
                        </Grid>
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