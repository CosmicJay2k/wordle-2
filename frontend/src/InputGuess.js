import { useState } from "react";

export default function InputGuess(props) {
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(true);

  const onClickGuess = () => {
    setText("");
    props.onGuess(text.toUpperCase());
    setDisable(true);
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
      />
      <button disabled={disable} onClick={onClickGuess}>
        Guess
      </button>
    </>
  );
}
