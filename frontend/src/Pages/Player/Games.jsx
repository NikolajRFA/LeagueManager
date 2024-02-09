import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Dashboard/Title';
import usePlayerGames from "../../BusinessLogic/usePlayerGames";
import Loading from "../../Components/Loading";
import {CircularProgress, Skeleton} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Games({playerId}) {
    const games = usePlayerGames(playerId)
    const navigate = useNavigate();

    return (
        <>
            <Title>Recent Games</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Versus</TableCell>
                        <TableCell>Winner</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {games.items ? games.items.map((item) => (
                        <TableRow key={item.url} onClick={() => navigate(`/games/${item.gameUrl.split("/").pop()}`)}
                                  style={{
                                      cursor: "pointer",
                                      backgroundColor: item.won ? "#90ee90" : "#FFC0CB"
                                  }}>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.role}</TableCell>
                            <TableCell>{item.team}</TableCell>
                            <TableCell>{item.versus}</TableCell>
                            <TableCell>{item.winner}</TableCell>
                        </TableRow>
                    )) : <CircularProgress/>}
                </TableBody>
            </Table>
            <Link color="primary" href="http://localhost:5000/games" sx={{mt: 3}}>
                See more games
            </Link>
        </>
    );
}
