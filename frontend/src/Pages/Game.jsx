import {useParams} from "react-router-dom";
import Template from "../Template/Template";
import Grid from "@mui/material/Grid";
import {useGame} from "../BusinessLogic/useGame";
import {useEffect} from "react";
import Paper from "@mui/material/Paper";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTeam} from "../BusinessLogic/useTeam";

export default function Game() {
    const {id} = useParams();
    const gameData = useGame(id);
    //let blueSideData = null;

    useEffect(() => {
        document.title = `${gameData.blueSide} vs. ${gameData.redSide}`;
        //if (gameData.blueSideUrl) blueSideData = useTeam(gameData.blueSideUrl.split("/").pop());
    }, [gameData]);

    return (
        <Template title={`${gameData.blueSide} vs. ${gameData.redSide}`}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
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
                        <Stack spacing={3}>
                            <Typography variant="subtitle1">
                                {gameData.blueSide}
                            </Typography>
                            {/*<Typography variant="subtitle2">
                                {blueSideData.league}
                            </Typography>*/}
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
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
                        <p>GameId: {id}</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
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
                        <Typography variant="subtitle1">
                            {gameData.redSide}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Template>
    )
}