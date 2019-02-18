import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DetailsPage from './DetailsPage';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

ReactDOM.render(

  <BrowserRouter>
    <Switch>
      <Route path='/index' component={App}/>
      <Route path='/details/:cardId' component={DetailsPage}/>
      <Route path='/' component={App}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
