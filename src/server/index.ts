import express from "express";
import { api } from "./api.js";
import cookieSession from "cookie-session";

export const app = express();

app.enable("trust proxy");
app.use(
  cookieSession({
    name: 'session',
    keys: ['my secret'],
    maxAge: 24 * 60 * 60 * 100,
  })

  // session({
    // signed: false,
    // name: "session",
    // secret: process.env.SESSION_SECRET || "my secret",
    // keys: [process.env.SESSION_SECRET || "my secret"],
    // maxAge: 24 * 60 * 60 * 100,
  // })
);

app.use('/api', api);

app.get("*", (req, res) => res.send(`api Server - path: "${req.path}"`));
app.listen(3002, () => console.log("Server started"));
