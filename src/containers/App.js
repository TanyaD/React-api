import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import MoviePage from "../MoviePage/MoviePage";
import HomePage from "../HomePage/HomePage";
import NotFound from "../NotFound/NotFound";
import SimpleModal from "../Modal/Modal";

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/moviepage" component={MoviePage} />
        <Route path="/modal" component={SimpleModal} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
