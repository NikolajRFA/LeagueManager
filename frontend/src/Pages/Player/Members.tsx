import Title from "../../Components/Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Utils from "../../Utils";
import {CircularProgress, SelectChangeEvent} from "@mui/material";
import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import Paging from "../../Components/Paging";
import {usePlayerMembers} from "../../BusinessLogic/usePlayerMembers";
import Container from "@mui/material/Container";

interface MembersProps {
    playerId: number;
}

const Members: FC<MembersProps> = ({playerId}) => {
    const pageValues: number[] = [5, 10, 15]
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const members = usePlayerMembers(playerId, page - 1, pageSize);
    const navigate = useNavigate();

    const handleNextClick = () => {
        if (page === members.numberOfPages) return;
        setPage(page + 1);
    }

    const handlePrevClick = () => {
        if (page === 1) return;
        setPage(page - 1);
    }

    const handleSelectChange = (e: SelectChangeEvent) => {
        setPageSize(Number(e.target.value));
    }

    return (
        <>
            <Container sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
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
                                      onClick={() => navigate(`/teams/${Utils.getLastIdFromUrl(member.teamUrl)}`)}
                                      style={{cursor: "pointer"}}
                            >
                                <TableCell>{member.teamName}</TableCell>
                                <TableCell>{member.fromDate}</TableCell>
                                <TableCell>{member.toDate ? member.toDate : "Current"}</TableCell>
                            </TableRow>
                        )) : <CircularProgress/>}
                    </TableBody>
                </Table>
            </Container>
            <Container sx={{p: 2}}>
                <Paging onNextClick={handleNextClick}
                        onPrevClick={handlePrevClick}
                        onSelectChange={handleSelectChange}
                        selectValues={pageValues}
                        selectDefaultValue={pageSize}
                        page={page}
                        numberOfPages={members.loading ? null : members.numberOfPages}
                />
            </Container>
        </>
    )
}

export default Members;