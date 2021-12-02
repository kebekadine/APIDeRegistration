import React from "react";
import {  Route, Switch } from 'react-router-dom'

import Home from './pages/Home';
import Users from './pages/Users';
export default class App extends React.Component{
    constructor(){
        super();
    }
    
    render(){
        return(
            <div>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            </Switch>   
            </div>
        );
    }
}
