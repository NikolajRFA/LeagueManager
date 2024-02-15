import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Player from "./Pages/Player";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Game from "./Pages/Game";
import Team from "./Pages/Team";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        document.title = 'LOLEngine';
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/players/:id" element={<Player/>}/>
                <Route path="/teams/:id" element={<Team/>}/>
                <Route path="/games/:id" element={<Game/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
