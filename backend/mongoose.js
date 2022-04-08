import mongoose from "mongoose";

const Player = mongoose.model("Player", {
  name: String,
  time: Number,
  guesses: Number,
  letters: Number,
  unique: String,
});

mongoose.connect("mongodb://localhost:27017/highscores");

export function dbPost(data) {
  const winner = new Player({
    name: data.player,
    time: data.time,
    guesses: data.guesses,
    letters: data.letters,
    unique: data.unique,
  });
  winner.save().then(() => console.log("highscore saved"));
}

export async function dbGet() {
  const highscores = await Player.find().lean();
  return highscores;
}
