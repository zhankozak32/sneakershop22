import React, {Component, useState} from 'react'
import './custom.css'
import './App.css'
import 'antd/dist/antd.css'
import Nav from './../src/components/Nav/Nav'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./containers/Home/Home";
import {BeatLoader} from "react-spinners";
import {useSelector} from "react-redux";
import Shop from "./containers/Shop/Shop";

const App = () => {

    const isFetching = useSelector(state => state.api.isFetching)

    return (
      <div className="app">
          <BeatLoader css="position: absolute; transform: translate(-50%); top: 50%; left: 50%;" size={48} color='orange' loading={isFetching}/>
          <BrowserRouter>
              <Nav/>
              <Switch>
                <Route exact path='/' component={Home}/>
                  <Route exact path='/shop' component={Shop}/>
              </Switch>
          </BrowserRouter>
      </div>
    )
}

export default App
