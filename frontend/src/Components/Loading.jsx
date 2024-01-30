import {CircularProgress} from "@mui/material";

export default function Loading({isLoading, children}) {
    return (
        isLoading ? <CircularProgress/> : <>{children}</>
    )
}