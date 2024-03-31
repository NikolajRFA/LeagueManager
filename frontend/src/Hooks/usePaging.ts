import {useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";

export default function usePaging(noPages: number, pageValues: number[] = [5, 10, 15]): [number, number, () => void, () => void, (e: SelectChangeEvent) => void] {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(pageValues[0]);

    const handleNextClick = () => {
        if (page === noPages) return;
        setPage(page + 1);
    }

    const handlePrevClick = () => {
        if (page === 1) return;
        setPage(page - 1);
    }

    const handleSelectChange = (e: SelectChangeEvent) => {
        setPageSize(Number(e.target.value));
    }

    return [page, pageSize, handleNextClick, handlePrevClick, handleSelectChange];
}