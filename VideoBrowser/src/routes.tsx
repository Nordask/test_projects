import * as React from 'react';
import { Switch, Route } from 'react-router';
import Home from '@components/Home/Home';

const routes = () => (
    <Switch>
        
        <Route path="/home" component={Home} />
        

    </Switch>

)

export default routes;