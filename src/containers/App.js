import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';

import HomePage from './HomePage';
import MoviePage from './MoviePage';
import NotFound from './NotFound';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <AppBar position="static">
                        <ToolBar>
                            <Button variant="contained" component={Link} to='/home'>HomePage</Button>
                            <Button variant="contained" component={Link} to='/moviepage'>MoviePage</Button>
                        </ToolBar>
                    </AppBar>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/moviepage' component={MoviePage}/>
                        <Route path='/home' component={HomePage} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
