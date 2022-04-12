import feedback from "./wordle";
import Result from "./Result";
import { v4 as uuidv4 } from "uuid";

export default function Feedback({ guess, answer, onEnd }) {
  if (guess !== undefined && guess.length > 0) {
    const word = feedback(answer, guess[0].word).map((letter) => {
      return (
        <Result
          key={uuidv4()}
          letter={letter.letter}
          result={letter.result}
          className={letter.result}
        />
      );
    });

    if (
      word.filter((l) => l.props.result.includes("incorrect")).length > 0 ||
      word.filter((l) => l.props.result.includes("misplaced")).length > 0
    ) {
      return word;
    } else {
      onEnd();
    }
  }
}
