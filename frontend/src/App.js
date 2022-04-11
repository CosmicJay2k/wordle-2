import "./App.css";
import { useState } from "react";
import Feedback from "./Feedback";
import InputGuess from "./InputGuess";
import InputHS from "./InputHS";
import postData from "./postData";
import InputSetup from "./InputSetup";

function App() {
  const [setup, setSetup] = useState([]);
  const [end, setEnd] = useState("running");
  const [guess, setGuess] = useState([]);
  const [timeStart, setTimeStart] = useState(new Date());
  const [answer, setAnswer] = useState([]);
  const [finalTime, setFinalTime] = useState();

  {
    /* // DEV // USE FOR START 
  import { wordPicker } from "./picker";
  import { listOfWords } from "./list";
  useEffect(() => {
    setAnswer(wordPicker(listOfWords, 6, false));
  }, [setup]);
  console.log(answer);*/
  }

  async function fetchAnswer(config) {
    const response = await fetch(
      `http://localhost:5080/api/random?letters=${config.letters}&unique=${config.unique}`
    );
    const data = await response.text();
    setAnswer(data.toUpperCase());
  }

  const onSetup = (config) => {
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
        <a href={"http://localhost:5080/info"}>
          <h3>Project Information</h3>
        </a>
      </div>
    );
  } else if (answer === "errorNoMatch") {
    return (
      <div className="App">
        <h1>WORDLE 2: ELECTRIC BOOGALOO </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href={"http://localhost:5080/highscores"}>
            <h3>Highscores</h3>
          </a>
        </div>
        <h4>No word matching those settings, please try again!</h4>
        <InputSetup onSetup={onSetup} />
        <a href={"http://localhost:5080/info"}>
          <h3>Project Information</h3>
        </a>
      </div>
    );
  } else if (end === "running") {
    return (
      <div className="App">
        <h1>WORDLE 2: ELECTRIC BOOGALOO </h1>
        <div className="guessContainer">
          <Feedback guess={guess.slice(-1)} answer={answer} onEnd={onEnd} />
        </div>
        <InputGuess onGuess={onGuess} answer={answer} />
        <h2>Previous guesses:</h2>
        <div>
          <ul style={{ padding: 0 }}>
            {guess.map((g) => (
              <li style={{ listStyleType: "none" }}>{g.word}</li>
            ))}
          </ul>
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
        <a href={"http://localhost:5080/info"}>
          <h3>Project Information</h3>
        </a>
      </div>
    );
  }
}

export default App;
