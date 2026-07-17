import { useEffect, useState } from "react";
import config from "./config.js";
import * as auth from "./lib/auth.js";
import * as store from "./lib/store.js";
import LoginCard from "./components/LoginCard.jsx";
import RecordsCard from "./components/RecordsCard.jsx";

export default function App() {
  const [token, setToken] = useState("");
  const [version, setVersion] = useState("dev");

  useEffect(() => {
    document.title = `Student Records [${config.envName}]`;
    fetch("./version.json")
      .then((res) => res.json())
      .then((data) => setVersion(data.version || "dev"))
      .catch(() => setVersion("dev"));
  }, []);

  async function handleLogin(username, password) {
    const res = await auth.login(username, password);
    if (res.ok) {
      store.seed();
      setToken(res.token);
    }
    return res;
  }

  function handleLogout() {
    auth.logout(token);
    setToken("");
  }

  const authenticated = auth.isAuthenticated(token);

  return (
    <>
      <main>
        {authenticated ? (
          <RecordsCard onLogout={handleLogout} />
        ) : (
          <div className="login-view">
            <LoginCard onLogin={handleLogin} />
          </div>
        )}
      </main>
    </>
  );
}
