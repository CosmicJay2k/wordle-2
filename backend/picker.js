export function wordPicker(list, nr, uniqueOrNot) {
  console.log(nr);
  console.log(uniqueOrNot);
  // Filter based on number
  let tempArray = list.filter((word) => word.length === nr);

  // Filter based on uniqueness
  let excludedArray = list.filter((word) => {
    const wordArr = Array.from(word);
    for (let [index, letter] of wordArr.entries()) {
      if (uniqueOrNot && wordArr.indexOf(letter) < index) {
        return true;
      }
    }
  });

  // Remove excluded words
  tempArray = tempArray.filter((word) => !excludedArray.includes(word));

  // Choose random word from filtered list
  let chosenWord = tempArray[Math.floor(Math.random() * tempArray.length)];

  // If no word meet criteria
  if (chosenWord === undefined) {
    chosenWord = "Det finns tyvärr inget ord som passar!";
  }

  return chosenWord;
}
