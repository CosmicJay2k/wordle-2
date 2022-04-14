import mongoose from "mongoose";

const Player = mongoose.model("Player", {
  name: String,
  time: Number,
  guesses: Number,
  letters: Number,
  unique: String,
});

const options = {
  serverSelectionTimeoutMS: 5000,
};
export async function dbConnect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/highscores", options);
    return "success";
  } catch (error) {
    console.log(error);
    console.log("Initial connection failure. Make sure mongoDB is running.");
  }
}

export async function dbPost(data) {
  try {
    const winner = new Player({
      name: data.player,
      time: data.time,
      guesses: data.guesses,
      letters: data.letters,
      unique: data.unique,
    });
    await winner.save();
  } catch (error) {
    console.log(error);
    console.log(
      "Inside dbPost. Can't connect to mongoDB, se above for details"
    );
    return "error";
  }
}

export async function dbGet() {
  try {
    const highscores = await Player.find().lean();
    let sortedHS = highscores.sort((a, b) => a.time - b.time);
    return sortedHS;
  } catch (error) {
    console.log(error);
    console.log("Inside dbGet. Can't connect to mongoDB, se above for details");
    return "error";
  }
}
