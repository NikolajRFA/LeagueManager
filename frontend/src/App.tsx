import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Player from "./Pages/Player";
import Game from "./Pages/Game";
import Team from "./Pages/Team";
import {useEffect, useState} from "react";
import React from "react";
import Template from "./Template/Template";
import {TitleProvider} from "./Contexts/TitleContext";

function App() {

    useEffect(() => {
        document.title = 'LOLEngine';
    }, []);

    return (
        <TitleProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<Template>
                        <Routes>
                            <Route path="/players/:id" element={<Player/>}/>
                            <Route path="/teams/:id" element={<Team/>}/>
                            <Route path="/games/:id" element={<Game/>}/>
                        </Routes>
                    </Template>}/>
                </Routes>
            </BrowserRouter>
        </TitleProvider>
    );
}

export default App;
