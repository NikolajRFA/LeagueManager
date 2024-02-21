import Paper from "@mui/material/Paper";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";

export default function Team({gameData, isBlueSide}) {
    const teamUrl = isBlueSide ? gameData.blueSideUrl : gameData.redSideUrl;

    return (
        <NavLink to={`/teams/${teamUrl.split('/').pop()}`}
                 style={{textDecoration: "none"}}>
            <Paper
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
                    <Typography variant="h4">
                        {isBlueSide ? gameData.blueSide : gameData.redSide}
                    </Typography>
                </Stack>
            </Paper>
        </NavLink>
    )
}