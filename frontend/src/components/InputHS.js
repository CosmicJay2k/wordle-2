import { useState } from "react";

export default function InputHS({ onSubmit }) {
  const [text, setText] = useState("");

  const onClickSubmit = () => {
    setText("");
    onSubmit(text);
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        id="inputName"
        value={text}
        onChange={onTextChange}
        placeholder="Enter your name"
      />
      <a href="http://localhost:5080/highscores">
        <button onClick={onClickSubmit}>Submit</button>
      </a>
    </>
  );
}
