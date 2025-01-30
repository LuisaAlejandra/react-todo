import express from "express";
import { api } from "./api.js";
import session from "cookie-session"
import { auth } from "./auth.js";

const app = express();

app.use(session({
  secret: "secret",
}))

app.use(auth)
app.use(api);
app.get("*", (req, res) => res.send(`api Server - path: "${req.path}"`))
app.listen(3002, () => console.log("Server started"));
