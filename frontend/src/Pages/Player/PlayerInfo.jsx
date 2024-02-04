import {Avatar, Box, Stack, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Loading from "../../Components/Loading";

export default function PlayerInfo({player}) {
    
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
            </Stack>
            <Loading isLoading={!player.nationality}>
                <Box
                    component="img"
                    /*sx={{
                        height: 233,
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                    }}*/
                    alt={player.nationality}
                    src={`https://flagsapi.com/${player.nationality}/flat/48.png`}
                />
            </Loading>
            {/*<Chip label="I am a chip, click me!" variant={chipState} color="success"
                                  onClick={handleChipClick}/>*/}
        </Stack>
    )
}