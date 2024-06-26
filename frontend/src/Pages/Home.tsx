import logo from "../logo.svg";
import {Button} from "@mui/material";
import Loading from "../Components/Loading";
import {usePlayer} from "../BusinessLogic/usePlayer";
import {useNavigate} from "react-router-dom";
import React from "react";
import {FC} from "react";

const Home: FC = () => {
    const playerData = usePlayer(7);
    const navigate = useNavigate();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo.toString()} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <Button variant="contained" onClick={() => alert('Button was clicked!')}>Contained</Button>
                <Loading isLoading={playerData.loading}>
                    <Button variant="contained"
                            onClick={() => navigate("/players/7")}>
                        {playerData.firstName} '{playerData.alias}' {playerData.lastName}: {playerData.age}
                    </Button>
                </Loading>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default Home;