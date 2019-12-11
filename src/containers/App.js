import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { createBrowserHistory } from "history";

import MoviePage from "../MoviePage/MoviePage";
import HomePage from "../HomePage/HomePage";

const history = createBrowserHistory();
history.location.pathname = decodeURIComponent(history.location.pathname);

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/moviepage" component={MoviePage} />
      </Switch>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
