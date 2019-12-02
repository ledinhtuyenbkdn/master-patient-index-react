import React, {forwardRef} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as reviewLinkAction from '../actions/ReviewLinkAction';
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
    SaveAlt, Search, ViewColumn, Done, Block, BorderColor
} from "@material-ui/icons";
import reactSwal from "../libs/SweetAlert";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

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

class ReviewLinkPage extends React.Component {

    componentDidMount() {
        this.props.action.getAllReviewLinks();
    }

    render() {
        let rows = this.props.reviewLinks;

        return (
            <Layout authentication={this.props.authentication}>
                <Grid container justify='center'>
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center' gutterBottom>
                            Duyệt thủ công
                        </Typography>
                        <MaterialTable
                            icons={tableIcons}
                            title="Review Link"
                            isLoading={this.props.loading}
                            actions={[
                                {
                                    icon: BorderColor,
                                    tooltip: 'Phê duyệt',
                                    onClick: (event, rowData) => {
                                        reactSwal.fire({
                                            icon: 'question',
                                            title: 'Phê duyệt',
                                            html: <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Thuộc tính</TableCell>
                                                        <TableCell align="right">Bệnh nhân</TableCell>
                                                        <TableCell align="right">Định danh</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Họ và tên</TableCell>
                                                        <TableCell align="right">{rowData.person.fullName}</TableCell>
                                                        <TableCell align="right">{rowData.masterPerson.fullName}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Số thẻ BHYT</TableCell>
                                                        <TableCell align="right">{rowData.person.healthInsuranceNumber}</TableCell>
                                                        <TableCell align="right">{rowData.masterPerson.healthInsuranceNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Số CMND</TableCell>
                                                        <TableCell align="right">{rowData.person.identificationNumber}</TableCell>
                                                        <TableCell align="right">{rowData.masterPerson.identificationNumber}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Địa chỉ</TableCell>
                                                        <TableCell align="right">{rowData.person.address}</TableCell>
                                                        <TableCell align="right">{rowData.masterPerson.address}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Ngày sinh</TableCell>
                                                        <TableCell align="right">{rowData.person.dateOfBirth}</TableCell>
                                                        <TableCell align="right">{rowData.masterPerson.dateOfBirth}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Giới tính</TableCell>
                                                        <TableCell align="right">{rowData.person.gender}</TableCell>
                                                        <TableCell align="right">{rowData.masterPerson.gender}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>,
                                            showCloseButton: true,
                                            showCancelButton: true,
                                            focusConfirm: false,
                                            confirmButtonText:
                                                <Done/>,
                                            confirmButtonAriaLabel: 'Approve',
                                            cancelButtonText:
                                                <Block/>,
                                            cancelButtonAriaLabel: 'Reject'
                                        }).then(result => {
                                            if (result.value) {
                                                this.props.action.approveReviewLink(rowData.id);
                                            } else {
                                                if (result.dismiss === 'cancel') {
                                                    this.props.action.rejectReviewLink(rowData.id);
                                                }
                                            }
                                        })
                                    }
                                }
                                ]}
                            columns={[
                                {title: 'Id', field: 'id', type: 'numeric', editable: 'never'},
                                {title: 'Mã bệnh nhân', field: 'person.patientCode'},
                                {title: 'Tên bệnh nhân', field: 'person.fullName'},
                                {title: 'Cơ sở y tế', field: 'person.healthCenter.name'},
                                {title: 'Mã định danh', field: 'masterPerson.id'},
                                {title: 'Điểm', field: 'score'},
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
        ...state.reviewLinkReducer,
        authentication: {
            accessToken: state.loginReducer.accessToken,
            userName: state.loginReducer.userName,
            roles: state.loginReducer.roles
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(reviewLinkAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewLinkPage);