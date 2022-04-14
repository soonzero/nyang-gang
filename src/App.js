import React, { useEffect } from "react";
import { authService } from "components/fbase/fbase";
import Main from "routes/Main";
import { GlobalStyle } from "components/styled";
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
      <GlobalStyle />
      <AppRouter />
    </div>
  );
}

export default App;
