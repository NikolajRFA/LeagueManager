import logo from './logo.svg';
import './App.css';
import {Button} from "@mui/material";
import {usePlayer} from "./BusinessLogic/usePlayer";
import {useEffect} from "react";

function App() {
  const playerData = usePlayer();

  useEffect(() => {

  }, [playerData]);

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button variant="contained" onClick={() => alert('Button was clicked!')}>Contained</Button>
          <Button variant="contained" onClick={() => alert(`Player API url is: ${playerData.url}`)}>{playerData.firstName} '{playerData.alias}' {playerData.lastName}: {playerData.age}</Button>
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
  );
}

export default App;
