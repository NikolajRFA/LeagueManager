import {Avatar, Box, Stack, Typography} from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import {useNavigate} from "react-router-dom";

export default function TeamInfo({team}) {
    const navigate = useNavigate();

    // TODO: Add flag
    return (
        <Stack spacing={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Avatar variant='rounded' sx={{width: 50, height: 50, marginRight: '10px'}}>
                <GroupsIcon/>
            </Avatar>
            <Stack spacing={0}
                   style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="subtitle1">
                    {team.name}
                </Typography>
                <Typography variant="subtitle2">
                    {team.league}
                </Typography>
                {/*
                <Loading isLoading={!player.nationality}>
                    <Box
                        component="img"
                        alt={player.nationality}
                        src={`https://flagsapi.com/${player.nationality}/flat/48.png`}
                    />
                </Loading>*/}
            </Stack>
        </Stack>
    )
}