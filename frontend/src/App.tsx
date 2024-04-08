import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Player from "./Pages/Player";
import SeriesSingle from "./Pages/SeriesSingle";
import Team from "./Pages/Team";
import {useEffect, useState} from "react";
import React from "react";
import Template from "./Template/Template";
import {TitleProvider} from "./Contexts/TitleContext";
import Players from "./Pages/Players";
import Series from "./Pages/Series";

function App() {

    useEffect(() => {
        document.title = 'LOLEngine';
    }, []);

    return (
        <TitleProvider>
            <BrowserRouter>
                <Routes>

                    <Route path="*" element={<Template>
                        <Routes>
                            <Route path={"/players"}>
                                <Route path="" element={<Players/>}/>
                                <Route path=":id" element={<Player/>}/>
                            </Route>
                            <Route path="/teams/:id" element={<Team/>}/>
                            <Route path="/series">
                                <Route path="" element={<Series/>}/>
                                <Route path=":id" element={<SeriesSingle/>}/>
                            </Route>
                        </Routes>
                    </Template>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </BrowserRouter>
        </TitleProvider>
    );
}

export default App;
