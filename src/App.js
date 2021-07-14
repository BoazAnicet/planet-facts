import { Redirect } from "react-router";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Planet from "./pages/Planet";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/:planet/:option" component={Planet} />
        <Route path="*" component={() => <Redirect to="/earth/overview" />} />
      </Switch>
    </>
  );
};

export default App;
