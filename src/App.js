import React, { useEffect } from "react";
import Home from "./routes/Home";
import "./reset.css";
import { authService } from "components/fbase/fbase";
import AppRouter from "routes/Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [init, setInit] = React.useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
    </div>
  );
}

export default App;
