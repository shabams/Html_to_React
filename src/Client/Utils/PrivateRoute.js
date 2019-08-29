import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import NavBar from '../Components/App/Layouts/NavBar/ScheduleNavBar';

class PrivateRoute extends Component {
  componentDidUpdate() {
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (
            <div style={{ maxWidth: 1366, margin: '0 auto' }}>
              <NavBar />
              <div className='booking-page'>
                <Component {...props} />
              </div>
            </div>
          )
        }
      />
    );
  }
}

export default withRouter(PrivateRoute);