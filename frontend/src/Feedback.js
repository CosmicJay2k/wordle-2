import feedback from "./wordle";
import Result from "./Result";
import { v4 as uuidv4 } from "uuid";

export default function Feedback(props) {
  if (props.guess !== undefined && props.guess.length > 0) {
    const word = feedback(props.answer, props.guess[0].word).map((letter) => {
      return (
        <Result
          key={uuidv4()}
          letter={letter.letter}
          result={letter.result}
          className={letter.result}
        />
      );
    });

    if (word.filter((l) => l.props.result.includes("incorrect")).length > 0) {
      return word;
    } else {
      props.onEnd();
    }
  }
}
