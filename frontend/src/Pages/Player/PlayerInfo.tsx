import {Avatar, Box, Stack, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Loading from "../../Components/Loading";
import {useNavigate} from "react-router-dom";
import React from "react";
import Utils from "../../Utils";
import API from "../../BusinessLogic/API";
import {Flag} from "../../Components/Flag";

export default function PlayerInfo({player}) {
    const navigate = useNavigate();

    return (
        <Stack spacing={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Avatar variant='rounded' sx={{width: 50, height: 50, marginRight: '10px'}}>
                <PersonIcon/>
            </Avatar>
            <Stack spacing={0}
                   style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="subtitle1">
                    {player.firstName} '{player.alias}' {player.lastName}
                </Typography>
                <Typography variant="subtitle2">
                    {player.gender}
                </Typography>
                <Typography variant="subtitle2">
                    {player.age}
                </Typography>
                <Typography variant="subtitle2"
                            onClick={() => navigate(`/teams/${Utils.getLastIdFromUrl(player.currentTeamUrl)}`)}
                            style={{cursor: 'pointer'}}>
                    {player.currentTeam}
                </Typography>
                <Loading isLoading={!player.nationality}>
                    <Flag country={player.nationality} width={72}/>
                </Loading>
            </Stack>
        </Stack>
    )
}