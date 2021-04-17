import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { NavBar, HotelAndDate, RoomType, Payment, Complete } from './components';

function App() {
  return (
    <Provider store={store}>
      <NavBar />

      <Router>
        <Switch>
          <Route exact path="/">
            <HotelAndDate />
          </Route>
          <Route exact path="/roomtype">
            <RoomType />
          </Route>
          <Route exact path="/payment">
            <Payment />
          </Route>
          <Route exact path="/complete">
            <Complete />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;