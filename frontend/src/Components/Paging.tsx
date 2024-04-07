import React, {FC} from "react";
import {Button, FormControl, MenuItem, Select} from "@mui/material";
import Typography from "@mui/material/Typography";

interface PagingProps {
    onNextClick: React.MouseEventHandler<HTMLButtonElement>,
    onPrevClick: React.MouseEventHandler<HTMLButtonElement>,
    onSelectChange,
    selectValues: number[],
    selectDefaultValue: number,
    page: number,
    numberOfPages?: number
}

const Paging: FC<PagingProps> = ({
                                     onNextClick,
                                     onPrevClick,
                                     onSelectChange,
                                     selectValues,
                                     selectDefaultValue,
                                     page,
                                     numberOfPages = null
                                 }) => {
    return (
        <>
            <Button variant='contained' style={{marginRight: '10px', height: '40px'}}
                    onClick={onPrevClick}>
                Prev
            </Button>
            <Button variant='contained' style={{marginRight: '10px', height: '40px'}}
                    onClick={onNextClick}>
                Next
            </Button>
            <FormControl size='small'>
                <Select value={selectDefaultValue.toString()}
                        onChange={onSelectChange}
                >
                    {selectValues.map(value => <MenuItem value={value} key={value}>{value}</MenuItem>)}
                </Select>
            </FormControl>
            <Typography variant='subtitle1'>
                Page {page} of {numberOfPages}
            </Typography>
        </>
    )
}

export default Paging;