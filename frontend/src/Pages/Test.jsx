import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Template from "../Template/Template";
import Chart from "./Dashboard/Chart";
import Deposits from "./Dashboard/Deposits";
import Orders from "./Dashboard/Orders";
import {Box, Button, Chip, LinearProgress, linearProgressClasses, Typography} from "@mui/material";
import {useState} from "react";
import {usePlayer} from "../BusinessLogic/usePlayer";
import {styled} from "@mui/material/styles";
import Loading from "../Components/Loading";

export default function Test() {
    const playerData = usePlayer();
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
        <Template title="Test">
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
                        <Chip label="I am a chip, click me!" variant={chipState} color="success"
                              onClick={handleChipClick}/>
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

                            <Grid item xs={12} md={8} lg={6}>
                                <Loading isLoading={!playerData.gameSense}>
                                    {/*BorderLinearProgress variant="determinate" value={20} />*/}
                                    <Typography variant="body2" color="text.secondary">Game Sense</Typography>
                                    <LinearProgressWithLabel value={playerData.gameSense}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={12} md={8} lg={6}>
                                <Loading isLoading={!playerData.teamFighting}>
                                    {/*BorderLinearProgress variant="determinate" value={20} />*/}
                                    <Typography variant="body2" color="text.secondary">Team Fighting</Typography>
                                    <LinearProgressWithLabel value={playerData.teamFighting}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={12} md={8} lg={6}>
                                <Loading isLoading={!playerData.dueling}>
                                    {/*BorderLinearProgress variant="determinate" value={20} />*/}
                                    <Typography variant="body2" color="text.secondary">Dueling</Typography>
                                    <LinearProgressWithLabel value={playerData.dueling}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={12} md={8} lg={6}>
                                <Loading isLoading={!playerData.jglPathing}>
                                    {/*BorderLinearProgress variant="determinate" value={20} />*/}
                                    <Typography variant="body2" color="text.secondary">Jungle Pathing</Typography>
                                    <LinearProgressWithLabel value={playerData.jglPathing}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={12} md={8} lg={6}>
                                <Loading isLoading={!playerData.waveMgmt}>
                                    {/*BorderLinearProgress variant="determinate" value={20} />*/}
                                    <Typography variant="body2" color="text.secondary">Wave Management</Typography>
                                    <LinearProgressWithLabel value={playerData.waveMgmt}/>
                                </Loading>
                            </Grid>
                            <Grid item xs={12} md={8} lg={6}>
                                <Loading isLoading={!playerData.waveMgmt}>
                                    {/*BorderLinearProgress variant="determinate" value={20} />*/}
                                    <Typography variant="body2" color="text.secondary">Farming</Typography>
                                    <LinearProgressWithLabel value={playerData.farming}/>
                                </Loading>
                            </Grid>
                            {/*<Grid item lg={1}>
                                <Typography variant="body2" color="text.secondary">
                                    12%
                                </Typography>
                            </Grid>*/}
                        </Grid>
                        {/*<Deposits />*/}
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