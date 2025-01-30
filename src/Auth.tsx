import { FormEvent, useEffect, useState } from "react";
import { remult, type UserInfo } from "remult";
import { App } from "./App";

export default function Auth() {
  const [username, setUserName] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  
  useEffect(() => {
    fetch("/api/currentUser").then(async (result) => {
      remult.user = await result.json();
      if (remult.user) setSignedIn(true);
    });
  }, []);
  
  if (!signedIn) {
    async function doSignIn(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const result = await fetch("/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (result.ok) {
        remult.user = await result.json();
        setSignedIn(true);
        setUserName("");
      } else {
        alert(await result.json());
      }
    }

    return (
      <>
        <h1>Todos</h1>
        <main>
          <form onSubmit={(e) => doSignIn(e)}>
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
            />
            <button>Sign in</button>
          </form>
        </main>
      </>
    );
  }
  async function signOut() {
    await fetch("/api/signOut", { method: "POST" });
    setSignedIn(false);
    remult.user = undefined;
  }

  return (
    <>
      <header>
        Hello, {remult.user!.name}{" "}
        <button onClick={(e) => signOut()}>Sign out</button>
      </header>
      <App />
    </>
  );
}
