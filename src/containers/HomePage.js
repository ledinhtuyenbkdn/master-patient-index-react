import React from "react";
import Layout from "../components/Layout";
import {connect} from 'react-redux';

class HomePage extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout authentication={this.props.authentication}>
                <h1>Welcome!!!</h1>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: {
            accessToken: state.loginReducer.accessToken,
            userName: state.loginReducer.userName,
            roles: state.loginReducer.roles
        }
    }
};

export default connect(mapStateToProps, null)(HomePage);