import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import Feedback from "./Feedback";
import Input from "./Input";
import InputHS from "./InputHS";
import { wordPicker } from "./picker";
import { listOfWords } from "./list";
import postData from "./postData";
import InputSetup from "./InputSetup";

function App() {
  const [setup, setSetup] = useState([]);
  const [end, setEnd] = useState("running");
  const [guess, setGuess] = useState([]);
  const [timeStart, setTimeStart] = useState(new Date());
  const [answer, setAnswer] = useState([]);
  const [finalTime, setFinalTime] = useState();

  async function fetchAnswer(config) {
    const response = await fetch(
      `http://localhost:5080/api/random?letters=${config.letters}&unique=${config.unique}`,
      {
        mode: "no-cors",
      }
    );
    const data = await response.text();
    setAnswer(data);
    console.log(setup);
  }

  console.log(answer);

  {
    /* USE FOR START 
  useEffect(() => {
    setAnswer(wordPicker(listOfWords, setup.letters, setup.unique));
  }, [setup]);
  console.log(answer);*/
  }

  const onSetup = (config) => {
    console.log(config);
    fetchAnswer(config);
    setTimeStart(new Date());
    setSetup(config);
  };

  const onGuess = (word) => {
    setGuess([...guess, { word }]);
  };

  const onEnd = () => {
    setEnd("end");
    const timeStop = new Date();
    setFinalTime((timeStop.getTime() - timeStart.getTime()) / 1000);
  };

  const onSubmit = (playerName) => {
    const data = {
      player: playerName,
      time: finalTime,
      guesses: guess.length,
      letters: setup.letters,
      unique: setup.unique,
    };
    postData("http://localhost:5080/api/highscore", data);
  };

  {
    /*useEffect(() => {
    const timeStop = new Date();
    setFinalTime((timeStop.getTime() - timeStart.getTime()) / 1000);
  }, [end]);*/
  }

  if (answer.length === 0) {
    return (
      <div className="App">
        <h1>WORDLE 2: ELECTRIC BOOGALOO </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href={"http://localhost:5080/highscores"}>
            <h3>Highscores</h3>
          </a>
        </div>
        <InputSetup onSetup={onSetup} />
      </div>
    );
  } else if (end === "running") {
    return (
      <div className="App">
        <h1>WORDLE 2: ELECTRIC BOOGALOO </h1>
        <Input onGuess={onGuess} />
        <div className="guessContainer">
          <Feedback guess={guess.slice(-1)} answer={answer} onEnd={onEnd} />
        </div>
      </div>
    );
  } else if (end === "end") {
    return (
      <div className="App">
        <h1>WORDLE 2: ELECTRIC BOOGALOO </h1>
        <h2>Game ended</h2>
        <p>The correct word was: {answer}</p>
        <p>Your time was: {finalTime}</p>
        <p>You guessed {guess.length} time(s)</p>
        <p>Enter your name to get on the Highscore list:</p>
        <InputHS onSubmit={onSubmit} />
      </div>
    );
  }
}

export default App;
