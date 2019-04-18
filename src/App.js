import React, { Component } from 'react';

import createHistory from "history/createBrowserHistory";

import { Provider} from 'react-redux';
import store from "./store.js"

import CustomRouter from "./components/CustomRouter"



class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <CustomRouter history={createHistory()} />
      </Provider>
    );
  }
}



export default  App;

