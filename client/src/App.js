import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import VideogameCreate from "./Components/VideogameCreate/VideogameCreate";
import Home from "./Components/Home/Home";
import VideogameDetail from "./Components/VideogameDetail/VideogameDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/videogameCreate" component={VideogameCreate} />
          <Route path="/videogameDetail/:id" component={VideogameDetail} />  
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
