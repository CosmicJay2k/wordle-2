import { useState } from "react";

export default function InputGuess(props) {
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(true);

  const onClickGuess = () => {
    setText("");
    props.onGuess(text.toUpperCase());
    setDisable(true);
  };

  const onEnter = (keyCode) => {
    if (keyCode === "Enter") {
      setText("");
      props.onGuess(text.toUpperCase());
      setDisable(true);
    }
  };

  const onTextChange = (e) => {
    setText(e.target.value);
    if (props.answer.length === e.target.value.length) {
      setDisable(false);
    } else if (props.answer.length !== e.target.value.length) {
      setDisable(true);
    }
  };

  return (
    <>
      <input
        type="text"
        id="inputGuess"
        maxLength={props.answer.length}
        value={text}
        onChange={onTextChange}
        onKeyUp={(e) => onEnter(e.code)}
        placeholder={`Write your ${props.answer.length}-letter guess`}
      />
      <button disabled={disable} onClick={onClickGuess}>
        Guess
      </button>
    </>
  );
}
