import Template from "../Template/Template";
import {useParams} from "react-router-dom";

export default function Team() {
    const {id} = useParams();

    return (
        <Template>
            {id}
        </Template>
    )
}