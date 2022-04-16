import express from "express";
import { wordPicker } from "./modules/picker.js";
import words from "./resources/words.js";
import { dbPost, dbGet, dbConnect } from "./mongoose/mongoose.js";
import { engine } from "express-handlebars";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./backend/views");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("/wordle-2/frontend/build/index.html", { root: "../" });
});

app.get("/info", (req, res) => {
  res.sendFile("/backend/resources/info.html", { root: "./" });
});

app.get("/api/random", (req, res) => {
  const letters = parseInt(req.query.letters);
  const answer = wordPicker(words, letters, req.query.unique);
  res.send(answer);
});

app.post("/api/highscore", async (req, res) => {
  const db = await dbConnect();
  const post = await dbPost(req.body);
  if (db !== "success" || post === "error") {
    res.render("mongo404");
  } else {
    res.end();
  }
});

app.get("/highscores", async (req, res) => {
  const db = await dbConnect();
  const highscores = await dbGet();
  if (db !== "success" || highscores === "error") {
    res.render("mongo404");
  } else {
    res.render("highscores", { highscores });
  }
});

app.use("/static", express.static("../wordle-2/frontend/build/static"));

export default app;
