import React, {forwardRef} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as masterPersonDetailAction from '../actions/MasterPersonDetailAction';
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
    SaveAlt, Search, ViewColumn, InsertLinkOutlined
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

class MasterPersonDetailPage extends React.Component {

    componentDidMount() {
        const masterPersonId = this.props.match.params.id;
        this.props.action.getMasterPersonDetail(masterPersonId);
    }

    render() {
        let rows = JSON.parse(JSON.stringify(this.props.masterPersonDetail.people));
        const masterPerson = JSON.parse(JSON.stringify(this.props.masterPersonDetail));
        masterPerson.dateOfBirth = this.props.masterPersonDetail.dateOfBirth[2] + '.' + this.props.masterPersonDetail.dateOfBirth[1] + '.' + this.props.masterPersonDetail.dateOfBirth[0];
        rows.forEach(row => {
            const dateOfBirth = row.dateOfBirth;
            if (dateOfBirth !== undefined && dateOfBirth !== null) {
                row.dateOfBirth = dateOfBirth[2] + '.' + dateOfBirth[1] + '.' + dateOfBirth[0];
            }
        });

        return (
            <Layout authentication={this.props.authentication}>
                <Grid container justify='center'>
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center' gutterBottom>
                            Xem chi tiết bệnh nhân liên kết
                        </Typography>
                        <Grid item xs={6}>
                            <Typography variant='body1' align='left' gutterBottom>Họ và tên: {masterPerson.fullName}</Typography>
                            <Typography variant='body1' align='left' gutterBottom>Số thẻ BHYT: {masterPerson.healthInsuranceNumber}</Typography>
                            <Typography variant='body1' align='left' gutterBottom>Số CMND: {masterPerson.identificationNumber}</Typography>
                            <Typography variant='body1' align='left' gutterBottom>Địa chỉ: {masterPerson.address}</Typography>
                            <Typography variant='body1' align='left' gutterBottom>Ngày sinh: {masterPerson.dateOfBirth}</Typography>
                            <Typography variant='body1' align='left' gutterBottom>Giới tính: {masterPerson.gender}</Typography>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <MaterialTable
                            icons={tableIcons}
                            title="Master Person Detail"
                            isLoading={this.props.loading}
                            columns={[
                                {title: 'Id', field: 'id', type: 'numeric', editable: 'never'},
                                {title: 'Mã bệnh nhân', field: 'patientCode'},
                                {title: 'CSYT', field: 'healthCenter.name'},
                                {title: 'Họ và tên', field: 'fullName'},
                                {title: 'Số thẻ BHYT', field: 'healthInsuranceNumber'},
                                {title: 'Số CMND', field: 'identificationNumber'},
                                {title: 'Địa chỉ', field: 'address'},
                                {title: 'Ngày sinh', field: 'dateOfBirth', type: 'date'},
                                {title: 'Giới tính', field: 'gender',
                                    lookup: {
                                        'FEMALE': 'Nữ', 'MALE': 'Nam'
                                    }},
                                {title: 'Trạng thái', field: 'personStatus', editable: 'never'},
                                {title: 'Điểm', field: 'score', editable: 'never'}
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
        ...state.masterPersonDetailReducer,
        authentication: {
            accessToken: state.loginReducer.accessToken,
            userName: state.loginReducer.userName,
            roles: state.loginReducer.roles
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(masterPersonDetailAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterPersonDetailPage);