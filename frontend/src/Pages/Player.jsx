import {usePlayer} from "../BusinessLogic/usePlayer";
import Loading from "../Components/Loading";
import {Avatar, Box, Card, Stack, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export default function Player() {
    const playerData = usePlayer();

    document.body.style.backgroundColor = '#d9e6ec';

    return (
        <>

            <Loading>
                <Card>
                    <Box sx={{p: 2, display: 'flex'}}>
                        <Avatar variant='rounded' sx={{width: 50, height: 50, marginRight: '10px'}}>
                            <PersonIcon/>
                        </Avatar>
                        <Stack spacing={0.5}>
                            <Typography fontWeight="bold">
                                {playerData.firstName} {playerData.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {playerData.alias}
                            </Typography>
                        </Stack>
                    </Box>
                </Card>
            </Loading>
        </>
    )
}