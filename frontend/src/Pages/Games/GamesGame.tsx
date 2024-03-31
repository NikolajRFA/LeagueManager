import React, {FC} from "react";
import {Card} from "@mui/material";
import Game from "../../BusinessLogic/Models/Game";

interface GamesGameProps {
    game: Game;
}

const GamesGame: FC<GamesGameProps> = ({game}) => {
    return (
        <Card style={{height: '90px'}}>{game.blueSide} vs. {game.redSide}</Card>
    )
}

export default GamesGame;