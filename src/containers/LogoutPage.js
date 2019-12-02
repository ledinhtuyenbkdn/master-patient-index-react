import React from "react";
import {bindActionCreators} from "redux";
import * as loginAction from '../actions/LoginAction';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class LogoutPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        this.props.action.logout();
        return <Redirect to='/login' />;
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.loginReducer,
        authentication: {
            accessToken: state.loginReducer.accessToken,
            userName: state.loginReducer.userName,
            roles: state.loginReducer.roles
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(loginAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);