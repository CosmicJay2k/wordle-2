import { useState } from "react";

export default function InputSetup(props) {
  const [config, setConfig] = useState({ letters: 5, unique: false });

  const onClickPlay = () => {
    props.onSetup(config);
  };

  const handleChange = (e) => {
    const { name, valueAsNumber } = e.target;
    setConfig((prevState) => ({ ...prevState, [name]: valueAsNumber }));
  };

  const handleCBChange = (e) => {
    if (e.target.checked) {
      setConfig((prevState) => ({ ...prevState, unique: true }));
    } else {
      setConfig((prevState) => ({ ...prevState, unique: false }));
    }
  };
  console.log(config);

  return (
    <>
      <label htmlFor="letters">Number of letters: </label>
      <input
        type="number"
        id="letters"
        name="letters"
        min="5"
        max="7"
        value={config.letters}
        onChange={handleChange}
      />

      <label htmlFor="unique">Unique letters: </label>
      <input type="checkbox" id="unique" onChange={handleCBChange} />

      <button onClick={onClickPlay}>Play!</button>
    </>
  );
}
