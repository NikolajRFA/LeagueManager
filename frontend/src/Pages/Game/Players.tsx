import Title from "../../Components/Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Utils from "../../Utils";
import {CircularProgress} from "@mui/material";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function Players({players, isBlueSide}) {
    const navigate = useNavigate();

    return (
        <>
            <Title>{isBlueSide ? "Blue Side" : "Red Side"}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((player) => (
                        <TableRow key={player.playerUrl} onClick={() => navigate(`/players/${player.playerUrl.split("/").pop()}`)}
                                  style={{
                                      cursor: "pointer",
                                  }}>
                            <TableCell>{player.firstName} '{player.alias}' {player.lastName}</TableCell>
                            <TableCell>{Utils.capitalize(player.role)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}