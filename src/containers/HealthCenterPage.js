import React, {forwardRef} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as healthCenterAction from '../actions/HealthCenterAction';
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import MaterialTable from "material-table";
import {
    AddBox, ArrowUpward,
    Check, ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage, LastPage, Remove,
    SaveAlt, Search, ViewColumn
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

class HealthCenterPage extends React.Component {

    componentDidMount() {
        this.props.action.getAllHealthCenters();
    }

    render() {
        let rows = this.props.healthCenters;

        return (
            <Layout authentication={this.props.authentication}>
                <Grid container justify='center'>
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center' gutterBottom>
                            Cơ sở y tế
                        </Typography>
                        <MaterialTable
                            icons={tableIcons}
                            title="Health Center"
                            isLoading={this.props.loading}
                            editable={{
                                onRowAdd: newData =>
                                    new Promise(((resolve, reject) => {
                                        this.props.action.createHealthCenter(newData);
                                        resolve();
                                    })),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise(((resolve, reject) => {
                                        this.props.action.updateHealthCenter(newData);
                                        resolve();
                                    })),
                                onRowDelete: oldData =>
                                    new Promise(((resolve, reject) => {
                                        this.props.action.deleteHealthCenter(oldData.id);
                                        resolve();
                                    })),
                            }}
                            columns={[
                                {title: 'Id', field: 'id', type: 'numeric', editable: 'never'},
                                {title: 'Tên cơ sở y tế', field: 'name'},
                                {title: 'Địa chỉ', field: 'address'}
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
        ...state.healthCenterReducer,
        authentication: {
            accessToken: state.loginReducer.accessToken,
            userName: state.loginReducer.userName,
            roles: state.loginReducer.roles
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(healthCenterAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthCenterPage);