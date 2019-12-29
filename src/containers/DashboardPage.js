import React from "react";
import Layout from "../components/Layout";
import {connect} from 'react-redux';
import {Typography} from "@material-ui/core";
import * as dashboardAction from '../actions/DashboardAction';
import {bindActionCreators} from "redux";
import Grid from "@material-ui/core/Grid";
import {HorizontalGridLines, LineSeries, RadialChart, VerticalBarSeries, XAxis, XYPlot, YAxis} from "react-vis";

class DashboardPage extends React.Component{

    componentDidMount() {
        this.props.action.getDashboardData();
    }

    render() {
        const {newMasterPerson, needReview, manualMatch, autoMatch, fastMatch} = this.props.dashboardData;
        const myData = [{angle: newMasterPerson, label: "New Master Person", innerRadius: 0.6, color: '#ec407a'},
            {angle: needReview, label: "Need Review", innerRadius: 0.6, color: '#5c6bc0'},
            {angle: manualMatch, label: "Manual Match", innerRadius: 0.6, color: '#26c6da'},
            {angle: autoMatch, label: "Auto Match", innerRadius: 0.6, color: '#9ccc65'},
            {angle: fastMatch, label: "Fast Match", innerRadius: 0.6, color: '#ffca28'}];
        return (
            <Layout authentication={this.props.authentication}>
                <Grid container justify='center'>
                    <Grid item xs={4}>
                        <Typography variant='h4' align='center' gutterBottom>
                            Thống kê số liệu
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify='center'>
                    <Grid item xs={6}>
                        <XYPlot
                            width={500}
                            height={500}
                            xType="ordinal"
                            stackBy="y"
                            colorType="literal">
                            <HorizontalGridLines />
                            <VerticalBarSeries
                                data={[
                                    {x: 'New Master Person', y: newMasterPerson, color: '#ec407a'},
                                    {x: 'Need Review', y: needReview, color: '#5c6bc0'},
                                    {x: 'Manual Match', y: manualMatch, color: '#26c6da'},
                                    {x: 'Auto Match', y: autoMatch, color: '#9ccc65'},
                                    {x: 'Fast Match', y: fastMatch, color: '#ffca28'}
                                ]}/>
                            <XAxis />
                            <YAxis />
                        </XYPlot>
                    </Grid>
                    <Grid item xs={6}>
                        <RadialChart
                            data={myData}
                            width={500}
                            height={500} showLabels={true} radius={200} colorType="literal" />
                    </Grid>
                </Grid>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.dashboardReducer,
        authentication: {
            accessToken: state.loginReducer.accessToken,
            userName: state.loginReducer.userName,
            roles: state.loginReducer.roles
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(dashboardAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);