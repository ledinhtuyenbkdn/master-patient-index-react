import React from "react";
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import LockIcon from '@material-ui/icons/Lock';
import Button from "@material-ui/core/Button";
import {bindActionCreators} from "redux";
import * as loginAction from '../actions/LoginAction';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        }
    }

    handleOnChangeUserName = (event) => {
        this.setState({...this.state, userName: event.target.value});
    };

    handleOnChangePassword = (event) => {
        this.setState({...this.state, password: event.target.value});
    };

    handleOnClickLogin = () => {
        const {userName, password} = this.state;
        this.props.action.login({userName, password});
    };

    render() {
        const {accessToken} = this.props;
        if (accessToken != null) {
            return <Redirect to='/'/>
        }
        return (
            <Layout authentication={this.props.authentication}>
                <Grid container justify='center'>
                    <Grid item xs={4}>
                        <Typography variant='h4' align='center' gutterBottom>
                            Đăng nhập
                        </Typography>
                        <FormControl fullWidth margin='normal'>
                            <TextField
                                id="input-username"
                                label="Tên đăng nhập"
                                margin='normal'
                                value={this.state.userName}
                                onChange={this.handleOnChangeUserName}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                id="input-password"
                                label="Mật khẩu"
                                margin='normal'
                                type='password'
                                value={this.state.password}
                                onChange={this.handleOnChangePassword}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid xs={4} item>
                                <Button variant="contained" color="primary" onClick={this.handleOnClickLogin}>
                                    Đăng nhập
                                </Button>
                            </Grid>
                        </FormControl>
                    </Grid>
                </Grid>
            </Layout>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);