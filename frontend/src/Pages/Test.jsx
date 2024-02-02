import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Template from "../Template/Template";
import Chart from "./Dashboard/Chart";
import Deposits from "./Dashboard/Deposits";
import Orders from "./Dashboard/Orders";
import {Button, Chip} from "@mui/material";
import {useState} from "react";

export default function Test() {
    const [chipState, setChipState] = useState('outlined')

    const handleChipClick = () => {
        if (chipState === 'outlined') {
            setChipState('filled');
        } else if (chipState === 'filled') {
            setChipState('outlined');
        }
    }

    return (
        <Template title="Test">
            <Grid container spacing={3}>

                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        {/*<Chart />*/}
                        <Button onClick={() => alert('Have a nice day!')}>Test</Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        {/*<Deposits />*/}
                        <Chip label="I am a chip, click me!" variant={chipState} color="success" onClick={handleChipClick}/>
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