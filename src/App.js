import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import HealthCenterPage from "./containers/HealthCenterPage";
import PersonPage from "./containers/PersonPage";
import MasterPersonPage from "./containers/MasterPersonPage";
import MasterPersonDetailPage from "./containers/MasterPersonDetailPage";
import ReviewLinkPage from "./containers/ReviewLinkPage";
import LogoutPage from "./containers/LogoutPage";
import {connect} from 'react-redux';
import * as loginAction from './actions/LoginAction';
import {bindActionCreators} from "redux";
import SettingPage from "./containers/SettingPage";
import UserPage from "./containers/UserPage";
import DashboardPage from "./containers/DashboardPage";

function App(props) {
    props.action.loadAccessTokenFromCookies();

    return (
        <Switch>
            <Route path='/' component={HomePage} exact/>
            <Route path='/login' component={LoginPage} exact/>
            <Route path='/logout' component={LogoutPage} exact/>
            <Route path='/dashboard' component={DashboardPage} exact/>
            <Route path='/settings' component={SettingPage} exact/>
            <Route path='/users' component={UserPage} exact/>
            <Route path='/persons' component={PersonPage} exact/>
            <Route path='/master-persons' component={MasterPersonPage} exact/>
            <Route path='/master-persons/:id' component={MasterPersonDetailPage}/>
            <Route path='/health-centers' component={HealthCenterPage} exact/>
            <Route path='/review-links' component={ReviewLinkPage} exact/>
        </Switch>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(loginAction, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(App);
