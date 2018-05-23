import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './Home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/lights" component={Layout} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
