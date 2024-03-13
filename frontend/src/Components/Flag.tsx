import React, {FC} from "react";
import API from "../BusinessLogic/API";
import {Box} from "@mui/material";

interface FlagProps {
    country: string;
    width: number;
}

export const Flag: FC<FlagProps> = ({country, width}) => {
    return (
        <Box
            component="img"
            width={width}
            alt={country.toUpperCase()}
            src={`https://flagcdn.com/w80/${country.toLowerCase()}.png`}
        />
    )
}