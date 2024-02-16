import Template from "../Template/Template";
import {useParams} from "react-router-dom";
import {useTeam} from "../BusinessLogic/useTeam";
import Members from "./Team/Members";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Games from "../Components/Games";
import TeamInfo from "./Team/TeamInfo";
import useTeamGames from "../BusinessLogic/useTeamGames";

export default function Team() {
    const {id} = useParams();
    const teamData = useTeam(id);
    const teamGames = useTeamGames(id);

    return (
        <Template title={teamData.name}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <TeamInfo team={teamData}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Members teamId={id}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Games games={teamGames} isPlayer={false}/>
                    </Paper>
                </Grid>
            </Grid>
        </Template>
    )
}