export default function feedback(correct, guess) {
  if (correct.length === guess.length) {
    // Create arrays and map with properties
    const correctArr = Array.from(correct).map((letter, index) => {
      return { id: index, letter, result: "null" };
    });

    const guessArr = Array.from(guess).map((letter, index) => {
      return { id: index, letter, result: "null" };
    });

    // Loop through arrays
    correctArr.forEach((cL) => {
      guessArr.forEach((gL) => {
        // If same letter in same place, set results to "correct"
        if (cL.letter === gL.letter && cL.id === gL.id) {
          cL.result = "correct";
          gL.result = "correct";
        }
        // If right letter in wrong place, set results to "misplaced" and "found"
        else if (
          cL.letter === gL.letter &&
          cL.result === "null" &&
          gL.result !== "correct"
        ) {
          cL.result = "found";
          gL.result = "misplaced";
        }
        // If wrong letter, set result to "incorrect"
        else if (gL.result === "null") {
          gL.result = "incorrect";
        }
      });
    });

    // Loop through a second time to fix "misplaced" errors steming from
    // multiples of same letter in guess
    correctArr.forEach((cL) => {
      guessArr.forEach((gL) => {
        if (
          gL.result === "misplaced" &&
          cL.result !== "found" &&
          cL.result !== "correct" &&
          gL.letter === cL.letter
        ) {
          gL.result = "incorrect";
        }
      });
    });

    return guessArr;
  } else {
  }
}
