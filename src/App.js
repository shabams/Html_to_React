import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';
import HomePage from './Client/Components/App/Home';
import Schedule2 from './Client/Components/App/Schedules/Schedule2';
import Schedule3 from './Client/Components/App/Schedules/Schedule3';
import Schedule4 from './Client/Components/App/Schedules/Schedule4';
import Schedule5 from './Client/Components/App/Schedules/Schedule5';
import Schedule6 from './Client/Components/App/Schedules/Schedule6';

import Booking1 from './Client/Components/App/Booking/Booking1';
import Booking2 from './Client/Components/App/Booking/Booking2';
import Booking3 from './Client/Components/App/Booking/Booking3';

import PrivateRoute from './Client/Utils/PrivateRoute';
import Store from './Client/Utils/Store';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return(
      <Provider store={Store}>
        <Router history={history}>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/Schedule2" component={Schedule2} />
          <Route exact path="/Schedule3" component={Schedule3} />
          <Route exact path="/Schedule4" component={Schedule4} />
          <Route exact path="/Schedule5" component={Schedule5} />
          <Route exact path="/Schedule6" component={Schedule6} />
          <Switch>
            <PrivateRoute exact path='/Booking1' component={Booking1} />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/Booking2' component={Booking2} />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/Booking3' component={Booking3} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;