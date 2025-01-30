import { type FormEvent, useEffect, useState } from "react";
import { remult, type UserInfo } from "remult";
import {App }from "./App";
import { AuthController } from "./shared/AuthController";

export default function Auth() {
  const [username, setUserName] = useState("");
  const [currentUser, _setCurrentUser] = useState<UserInfo>()

  function setCurrentUser(user: UserInfo | undefined) {
    _setCurrentUser(user)
    remult.user = user
  }

  async function signIn(f: FormEvent<HTMLFormElement>) {
    f.preventDefault();
    try {
        setCurrentUser( await AuthController.signIn(username))
    } catch (error: unknown) {
      alert((error as { message: string }).message || "Error al iniciar sesion");
    }
  }

  async function signOut() {
    setCurrentUser(await AuthController.signOut())
  }

  useEffect(() => {
    setCurrentUser(remult.user)
  }, []);

  if (!currentUser)
    return (
      <>
        <main className="sign-in">
        <h2>Sign In</h2>
          <form onSubmit={signIn}>
            <label>User</label>
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
  return (
    <>
      <div>
        Hello, {currentUser?.name} <button onClick={signOut}>Sign out</button>
      </div>
      <App />
    </>
  );
}
