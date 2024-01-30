import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Player from "./Pages/Player";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/player" element={<Player/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
