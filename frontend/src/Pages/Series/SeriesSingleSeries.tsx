import React, {FC, useEffect, useRef, useState} from "react";
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
    const blueSidePaperRef = useRef(null);
    const redSidePaperRef = useRef(null);
    const [widestTeamPaperWidth, setWidestTeamPaperWidth] = useState(0);
    const teamPaperHeight = 48;


    useEffect(() => {
        console.log(blueSidePaperRef.current.offsetWidth)
        if (blueSidePaperRef.current.offsetWidth > redSidePaperRef.current.offsetWidth) {
            setWidestTeamPaperWidth(blueSidePaperRef.current.offsetWidth + 12);
        } else {
            setWidestTeamPaperWidth(redSidePaperRef.current.offsetWidth + 12);
        }
    }, [blueSidePaperRef.current, redSidePaperRef.current]);

    return (
        <Card style={{height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Grid container style={center}>
                <Grid item md={4} lg={4} xl={4} style={{...center}}>
                    <Paper ref={blueSidePaperRef} style={{
                        ...center,
                        backgroundColor: blueSideIsWinner ? '#90ee90' : '#FFC0CB',
                        width: `${widestTeamPaperWidth}px`,
                        height: `${teamPaperHeight}px`,
                        textAlign: 'center'
                    }}>
                        {game.blueSide}
                    </Paper>
                </Grid>
                <Grid item md={4} lg={4} xl={4} style={center}>
                    vs.
                </Grid>
                <Grid item md={4} lg={4} xl={4} style={center}>
                    <Paper ref={redSidePaperRef} style={{
                        ...center,
                        backgroundColor: !blueSideIsWinner ? '#90ee90' : '#FFC0CB',
                        width: `${widestTeamPaperWidth}px`,
                        height: `${teamPaperHeight}px`,
                        textAlign: 'center'
                    }}>
                        {game.redSide}
                    </Paper>
                </Grid>
            </Grid>
        </Card>
    )
}

export default SeriesSingleSeries;