import {useParams} from "react-router-dom";

export default function Game() {
    const {id} = useParams();

    return (
        <>
            <p>This is a test!</p>
            <p>game id: {id}</p>
        </>
    )
}