import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Template from "../Template/Template";
import Chart from "./Dashboard/Chart";
import Deposits from "./Dashboard/Deposits";
import Orders from "./Dashboard/Orders";
import {Button, Chip, LinearProgress, linearProgressClasses} from "@mui/material";
import {useState} from "react";
import {usePlayer} from "../BusinessLogic/usePlayer";
import {styled} from "@mui/material/styles";

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

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
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
                        <Chip label="I am a chip, click me!" variant={chipState} color="success" onClick={handleChipClick}/>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Grid container>
                            <Grid item xs={12} md={8} lg={9}>
                                <BorderLinearProgress variant="determinate" value={20} />
                            </Grid>
                        </Grid>
                        {/*<Deposits />*/}
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Orders />
                    </Paper>
                </Grid>
            </Grid>
        </Template>
    )
}