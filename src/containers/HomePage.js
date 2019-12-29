import React from "react";
import Layout from "../components/Layout";
import {connect} from 'react-redux';
import {Typography} from "@material-ui/core";

class HomePage extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout authentication={this.props.authentication}>
                <h1>Xin chào đến với hệ thống chỉ mục bệnh nhân!!!</h1>
                <Typography variant='body1' align='left' gutterBottom>
                    Master Patient Index(gọi tắt là MPI) là một hệ thống lưu giữ thông tin bệnh nhân khi các bệnh nhân này tham gia các dịch vụ chăm sóc sức khỏe ở các cơ sở y tế khác nhau.
                </Typography>
                <Typography variant='body1' align='left' gutterBottom>
                    MPI nhằm mục đích gán mỗi bệnh nhân với 1 định danh duy nhất.
                    Ví dụ: khi một bệnh nhân đến khám tại các cơ sở y tế khác nhau thì ở những cơ sở y tế này sẽ tạo ra nhiều bản ghi chứa thông tin của bệnh nhân này, hệ thống MPI sẽ giúp ta biết được những bản ghi này đều tham chiếu đến cùng 1 người duy nhất.
                </Typography>
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