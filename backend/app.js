import express from "express";
import { wordPicker } from "./picker.js";
import { listOfWords } from "./list.js";
import { dbPost, dbGet } from "./mongoose.js";
import { engine } from "express-handlebars";

const app = express();

app.engine(
  "handlebars",
  engine({
    helpers: {
      markdown: (md) => marked(md),
    },
  })
);

app.set("view engine", "handlebars");
app.set("views", "./backend/views");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("/wordle-2/frontend/build/index.html", { root: "../" });
});

app.get("/info", (req, res) => {
  res.sendFile("/backend/info.html", { root: "./" });
});

app.get("/api/random", (req, res) => {
  const letters = parseInt(req.query.letters);
  const answer = wordPicker(listOfWords, letters, req.query.unique);
  res.send(answer);
});

app.post("/api/highscore", (req, res) => {
  console.log("post recieved");
  console.log(req.body);
  dbPost(req.body);
  res.end();
});

app.get("/highscores", async (req, res) => {
  const highscores = await dbGet();
  res.render("highscores", { highscores });
});

app.use("/static", express.static("../wordle-2/frontend/build/static"));

export default app;
