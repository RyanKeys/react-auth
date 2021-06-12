import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import Listings from "./components/Listings/Listings";
import useToken from "./components/Token/useToken";

function App() {
  const { token, setToken } = useToken();
  if (!token) {
    return (
      <div className="App">
        <Navbar loggedIn={false} />
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login setToken={setToken} />
            </Route>
            <Route path="/register">
              <Register setToken={setToken} />
            </Route>
            <Route path="/">
              <Listings />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar loggedIn={true} />
        <BrowserRouter>
          <Switch>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/">
              <Listings />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
