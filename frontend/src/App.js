import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Player from "./Pages/Player";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Template from "./Template/Template";
import {Button} from "@mui/material";
import Test from "./Pages/Test";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/player" element={<Player/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
