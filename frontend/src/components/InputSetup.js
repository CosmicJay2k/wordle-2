import { useState } from "react";

export default function InputSetup({ onSetup }) {
  const [config, setConfig] = useState({ letters: 5, unique: false });

  const onClickPlay = () => {
    onSetup(config);
  };

  const handleChange = (e) => {
    const { name, valueAsNumber } = e.target;
    setConfig((prevState) => ({ ...prevState, [name]: valueAsNumber }));
  };

  const handleCbChange = (e) => {
    if (e.target.checked) {
      setConfig((prevState) => ({ ...prevState, unique: true }));
    } else {
      setConfig((prevState) => ({ ...prevState, unique: false }));
    }
  };

  return (
    <>
      <label htmlFor="letters">Number of letters: </label>
      <input
        type="number"
        id="letters"
        name="letters"
        min="5"
        max="10"
        value={config.letters}
        onChange={handleChange}
      />

      <label htmlFor="unique">Unique letters: </label>
      <input type="checkbox" id="unique" onChange={handleCbChange} />

      <button onClick={onClickPlay}>Play!</button>
    </>
  );
}
