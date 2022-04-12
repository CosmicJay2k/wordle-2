import { useState } from "react";

export default function InputGuess({ answer, onGuess }) {
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(true);

  const onClickGuess = () => {
    setText("");
    onGuess(text.toUpperCase());
    setDisable(true);
  };

  const onEnter = (keyCode) => {
    if (keyCode === "Enter") {
      setText("");
      onGuess(text.toUpperCase());
      setDisable(true);
    }
  };

  const onTextChange = (e) => {
    setText(e.target.value);
    if (answer.length === e.target.value.length) {
      setDisable(false);
    } else if (answer.length !== e.target.value.length) {
      setDisable(true);
    }
  };

  return (
    <>
      <input
        type="text"
        id="inputGuess"
        maxLength={answer.length}
        value={text}
        onChange={onTextChange}
        onKeyUp={(e) => onEnter(e.code)}
        placeholder={`Write your ${answer.length}-letter guess`}
      />
      <button disabled={disable} onClick={onClickGuess}>
        Guess
      </button>
    </>
  );
}
