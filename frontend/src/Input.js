import { useState } from "react";

export default function Input(props) {
  const [text, setText] = useState("");

  const onClickGuess = () => {
    setText("");
    props.onGuess(text);
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <input type="text" id="inputGuess" value={text} onChange={onTextChange} />
      <button onClick={onClickGuess} title="Guess">
        Guess
      </button>
    </>
  );
}
