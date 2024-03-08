import Paper from "@mui/material/Paper";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";
import React from "react";
import Utils from "../../Utils";

export default function Team({gameData, isBlueSide}) {
    const teamUrl: string = isBlueSide ? gameData.blueSideUrl : gameData.redSideUrl;

    return (
        <NavLink to={`/teams/${Utils.getLastIdFromUrl(teamUrl)}`}
                 style={{textDecoration: "none"}}>
            <Paper className={"boxed-text"}
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: teamUrl === gameData.winnerUrl ? '#90ee90' : '#FFC0CB'
                }}
            >
                <Stack spacing={3}>
                    <Typography variant="h4" className={"text"}>
                        {isBlueSide ? gameData.blueSide : gameData.redSide}
                    </Typography>
                </Stack>
            </Paper>
        </NavLink>
    )
}