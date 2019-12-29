import React, {forwardRef} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as userAction from '../actions/UserAction';
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import MaterialTable from "material-table";
import reactSwal from "../libs/SweetAlert";
import {
    AddBox, ArrowUpward,
    Check, ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage, LastPage, Remove,
    SaveAlt, Search, ViewColumn, Visibility, InsertLinkOutlined
} from "@material-ui/icons";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

class UserPage extends React.Component {

    componentDidMount() {
        this.props.action.getAllUsers();
    }

    render() {
        let rows = this.props.users;
        const {healthCenters, roles} = this.props;

        const healthCenterMap = {};
        healthCenters.forEach(healthCenter => {
            healthCenterMap[healthCenter.id] = healthCenter.name;
        });

        const roleMap = {};
        roles.forEach(role => {
            roleMap[role.id] = role.roleName;
        });

        return (
            <Layout authentication={this.props.authentication}>
                <Grid container justify='center'>
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center' gutterBottom>
                            Quản lý người dùng
                        </Typography>
                        <MaterialTable
                            icons={tableIcons}
                            title="Users"
                            isLoading={this.props.loading}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise(((resolve, reject) => {
                                        this.props.action.createUser(newData);
                                        resolve();
                                    }))
                            }}
                            columns={[
                                {title: 'Id', field: 'id', type: 'numeric', editable: 'never'},
                                {title: 'Họ và tên', field: 'fullName'},
                                {title: 'Tên đăng nhập', field: 'userName'},
                                {title: 'Mật khẩu', field: 'password'},
                                {title: 'Cơ sở y tế', field: 'healthCenter.id', lookup: healthCenterMap},
                                {title: 'Vai trò', field: 'role.id', lookup: roleMap}
                            ]}
                            data={rows}
                        />
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.userReducer,
        authentication: {
            accessToken: state.loginReducer.accessToken,
            userName: state.loginReducer.userName,
            roles: state.loginReducer.roles
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(userAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);