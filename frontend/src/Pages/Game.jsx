import {useParams} from "react-router-dom";
import Template from "../Template/Template";

export default function Game() {
    const {id} = useParams();

    return (
        <Template>
            <p>This is a test!</p>
            <p>game id: {id}</p>
        </Template>
    )
}