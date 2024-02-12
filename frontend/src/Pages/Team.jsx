import Template from "../Template/Template";
import {useParams} from "react-router-dom";
import {useTeam} from "../BusinessLogic/useTeam";
import Members from "./Team/Members";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PlayerInfo from "./Player/PlayerInfo";
import PlayerStats from "./Player/PlayerStats";
import Games from "./Player/Games";

export default function Team() {
    const {id} = useParams();
    const teamData = useTeam(id);

    return (
        <Template title={teamData.name}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Members teamId={id}/>
                    </Paper>
                </Grid>
            </Grid>
        </Template>
    )
}