import {CircularProgress} from "@mui/material";
import React from "react";

export default function Loading({isLoading, children}) {
    return (
        isLoading ? <CircularProgress/> : <>{children}</>
    )
}