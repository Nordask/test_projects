import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route, Switch} from "react-router";
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from '@components/App/App';

const component = (
  <HashRouter>
    <Switch>
      <Route path="/" component={App}/>
    </Switch>
  </HashRouter>
);

ReactDOM.render (component, document.getElementById("root"));