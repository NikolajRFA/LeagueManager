import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Dashboard/Title';
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Utils from "../../Utils";
import {useTeamMembers} from "../../BusinessLogic/useTeamMembers";

export default function Members({teamId}) {
    const members = useTeamMembers(teamId, true);
    const navigate = useNavigate();

    return (
        <>
            <Title>Current Members</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Alias</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.items ? members.items.map((item) => (
                        <TableRow key={item.url}
                                  style={{
                                      cursor: "pointer",
                                  }}>
                            <TableCell><Link href={`/players/${item.url.split("/").pop()}`}>{item.firstName} {item.lastName}</Link></TableCell>
                            <TableCell>{item.alias}</TableCell>
                            <TableCell>{Utils.capitalize(item.role)}</TableCell>
                        </TableRow>
                    )) : <CircularProgress/>}
                </TableBody>
            </Table>
            <Link color="primary" href="http://localhost:5000/games" sx={{mt: 3}}>
                See more members
            </Link>
        </>
    );
}
