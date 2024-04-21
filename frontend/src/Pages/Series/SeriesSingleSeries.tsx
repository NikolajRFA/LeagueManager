import React, {FC} from "react";
import {Card} from "@mui/material";
import Series from "../../BusinessLogic/Models/Series";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

interface GamesGameProps {
    game: Series;
}

const SeriesSingleSeries: FC<GamesGameProps> = ({game}) => {
    const center = {display: 'flex', alignItems: 'center', justifyContent: 'center'}
    const blueSideIsWinner = game.blueSideUrl === game.winnerUrl;

    return (
        <Card style={{height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Grid container style={center}>
                <Grid item lg={4} style={center}>
                    <Paper style={{backgroundColor: blueSideIsWinner ? '#90ee90' : '#FFC0CB'}}>
                        {game.blueSide}
                    </Paper>
                </Grid>
                <Grid item lg={4} style={center}>
                    vs.
                </Grid>
                <Grid item lg={4} style={center}>
                    <Paper style={{backgroundColor: !blueSideIsWinner ? '#90ee90' : '#FFC0CB'}}>
                        {game.redSide}
                    </Paper>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SeriesSingleSeries;