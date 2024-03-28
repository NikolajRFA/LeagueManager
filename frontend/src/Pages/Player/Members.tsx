import Title from "../../Components/Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Utils from "../../Utils";
import {CircularProgress} from "@mui/material";
import Link from "@mui/material/Link";
import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import PlayerMember from "../../BusinessLogic/Models/PlayerMember";
import List from "../../BusinessLogic/Models/List";

interface MembersProps {
    members: List<PlayerMember>;
}

const Members: FC<MembersProps> = ({members}) => {
    const navigate = useNavigate();
    return (
        <>
            <Title>Teams</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell>From Date</TableCell>
                        <TableCell>To Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.items ? members.items.map((member: any) => (
                        <TableRow key={member.playerUrl + member.teamUrl + member.stay}
                                  onClick={() => navigate(`/games/${Utils.getLastIdFromUrl(member.teamUrl)}`)}
                                  style={{cursor: "pointer"}}
                        >
                            <TableCell>{member.teamName}</TableCell>
                            <TableCell>{member.fromDate}</TableCell>
                            <TableCell>{member.toDate ? member.toDate : "Current"}</TableCell>
                        </TableRow>
                    )) : <CircularProgress/>}
                </TableBody>
            </Table>
            <Link color="primary" href="http://localhost:5000/games" sx={{mt: 3}}>
                See more games
            </Link>
        </>
    )
}

export default Members;