import express from "express";
import { api } from "./api.js";
import session from "cookie-session";
import { auth } from "./auth.js";

const app = express();

app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "secret",
  })
);

app.use(api);
app.use(auth);
app.get("*", (req, res) => res.send(`api Server - path: "${req.path}"`));
app.use(express.static(process.cwd() + "/dist"));
app.listen(process.env["PORT"] || 3002, () => console.log("Server started"));
