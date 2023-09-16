import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import usersRouter from "./apis/users/users.js";
import booksRouter from "./apis/books/books.js";
import friendRouter from "./apis/friends/friends.js";
import currentRouter from "./apis/current/current.js";
import recommendationsRouter from "./apis/recommendations/recommendations.js";
import reviewsRouter from "./apis/reviews/reviews.js";
import usersListRouter from "./apis/users/usersList.js";
import { authenticate } from "./utilities/middlewares.js";
import path from "path";
import * as url from "url";

dotEnv.config();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
this.app.use(express.static(path.join(__dirname, "../app/build")));

app.use("/login", usersRouter); //ladning = source page
app.use("/users", authenticate, usersListRouter);
app.use("/books", authenticate, booksRouter);
app.use("/friends", authenticate, friendRouter);
app.use("/current", authenticate, currentRouter);
app.use("/recommendations", authenticate, recommendationsRouter);
app.use("/reviews", authenticate, reviewsRouter);

app.listen(process.env.PORT, error => {
  if (!error) console.log("Server started...");
  else console.log("Error ", error);
});
