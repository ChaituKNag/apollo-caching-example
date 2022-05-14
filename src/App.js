import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import FilmDetails from "./components/FilmDetails";
import FilmPerson from "./components/FilmPerson";
import Films from "./components/Films";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/film/:id">
            <FilmDetails />
          </Route>
          <Route path="/films">
            <Films />
          </Route>
          <Route path="/person/:id">
            <FilmPerson />
          </Route>
          <Route exact path="*">
            <Redirect to="/films" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
