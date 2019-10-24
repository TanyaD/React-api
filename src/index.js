import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import App from "./containers/App/App";
import "./index.css";
import reducer from "./reducers/reducer";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<App store={store} />, document.getElementById("root"));

serviceWorker.unregister();
