import React, {FC} from "react";
import Game from "../../BusinessLogic/Models/Game";
import Table from "@mui/material/Table";
import Title from "../../Components/Title";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";

interface SeriesGameProps {
    games: Game[]
    blueSide: string;
    redSide: string;
}

const SeriesGame: FC<SeriesGameProps> = ({games, blueSide, redSide}) => {
    return (
        <>
            <Title>Games</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Winner</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {games.map((game, index) => (
                        <TableRow key={game.url}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{game.blueSideWon ? blueSide : redSide}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default SeriesGame;