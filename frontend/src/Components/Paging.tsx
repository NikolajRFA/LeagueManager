import React, {FC} from "react";
import {Button, MenuItem, Select} from "@mui/material";
import Typography from "@mui/material/Typography";

interface PagingProps {
    onNextClick: React.MouseEventHandler<HTMLButtonElement>,
    onPrevClick: React.MouseEventHandler<HTMLButtonElement>,
    onSelectChange,
    selectDefaultValue: number,
    page: number,
    numberOfPages?: number
}

const Paging: FC<PagingProps> = ({
                                     onNextClick,
                                     onPrevClick,
                                     onSelectChange,
                                     selectDefaultValue,
                                     page,
                                     numberOfPages = null
                                 }) => {
    return (
        <>
            <Button variant='contained' style={{marginRight: '10px'}}
                    onClick={onPrevClick}>
                Prev
            </Button>
            <Button variant='contained' style={{marginRight: '10px'}}
                    onClick={onNextClick}>
                Next
            </Button>
            <Select value={selectDefaultValue.toString()}
                    onChange={onSelectChange}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
            </Select>
            <Typography variant='subtitle1'>
                Page {page} of {numberOfPages}
            </Typography>
        </>
    )
}

export default Paging;