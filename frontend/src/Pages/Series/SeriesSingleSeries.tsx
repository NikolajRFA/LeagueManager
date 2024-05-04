import React, {FC, useEffect, useRef, useState} from "react";
import {Card, Stack} from "@mui/material";
import Series from "../../BusinessLogic/Models/Series";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface GamesGameProps {
    game: Series;
}

const SeriesSingleSeries: FC<GamesGameProps> = ({game}) => {
    const center = {display: 'flex', alignItems: 'center', justifyContent: 'center'}
    const blueSideIsWinner = game.blueSideUrl === game.winnerUrl;
    const blueSideTypographyRef = useRef(null);
    const redSideTypographyRef = useRef(null);
    const [widestTeamPaperWidth, setWidestTeamPaperWidth] = useState(200);
    const teamPaperHeight = 48;


    useEffect(() => {
        if (blueSideTypographyRef.current.offsetWidth > redSideTypographyRef.current.offsetWidth) {
            setWidestTeamPaperWidth(blueSideTypographyRef.current.offsetWidth + 12);
        } else {
            setWidestTeamPaperWidth(redSideTypographyRef.current.offsetWidth + 12);
        }
    }, [blueSideTypographyRef.current, redSideTypographyRef.current]);

    return (
        <Card style={{height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Grid container style={center}>
                <Grid item md={4} lg={4} xl={4} style={{...center}}>
                    <Paper style={{
                        ...center,
                        backgroundColor: blueSideIsWinner ? '#90ee90' : '#FFC0CB',
                        width: `${widestTeamPaperWidth}px`,
                        height: `${teamPaperHeight}px`,
                        textAlign: 'center'
                    }}>
                        <Typography ref={blueSideTypographyRef}>{game.blueSide}</Typography>
                    </Paper>
                </Grid>
                <Grid item md={4} lg={4} xl={4} style={center}>
                    <Stack style={center}>
                        <Typography variant={"h6"}>vs.</Typography>
                        <Typography variant={"h6"}>{game.games.filter(game => game.blueSideWon).length} - {game.games.filter(game => !game.blueSideWon).length}</Typography>
                    </Stack>
                </Grid>
                <Grid item md={4} lg={4} xl={4} style={center}>
                    <Paper style={{
                        ...center,
                        backgroundColor: !blueSideIsWinner ? '#90ee90' : '#FFC0CB',
                        width: `${widestTeamPaperWidth}px`,
                        height: `${teamPaperHeight}px`,
                        textAlign: 'center'
                    }}>
                        <Typography ref={redSideTypographyRef}>{game.redSide}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SeriesSingleSeries;