import React, {FC} from "react";
import {Card} from "@mui/material";
import Series from "../../BusinessLogic/Models/Series";

interface GamesGameProps {
    game: Series;
}

const GamesGame: FC<GamesGameProps> = ({game}) => {
    return (
        <Card style={{height: '90px'}}>{game.blueSide} vs. {game.redSide}</Card>
    )
}

export default GamesGame;