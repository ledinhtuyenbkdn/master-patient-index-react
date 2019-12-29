import React, {forwardRef} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as settingAction from '../actions/SettingAction';
import Layout from "../components/Layout";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import CompareIcon from '@material-ui/icons/Compare';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LinkIcon from '@material-ui/icons/Link';
import Slider from "@material-ui/core/Slider";
import PieChartIcon from '@material-ui/icons/PieChart';
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import ViewDayIcon from '@material-ui/icons/ViewDay';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import reactSwal from "../libs/SweetAlert";
import Table from "@material-ui/core/Table";
import {Block, Done} from "@material-ui/icons";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {toast} from "react-toastify";

const marks = [
    {
        value: 0,
        label: '0 điểm',
    },
    {
        value: 100,
        label: '100 điểm',
    }
];

function valuetext(value) {
    return `${value} điểm`;
}

const fields = [
    'FULL_NAME',
    'HEALTH_INSURANCE_NUMBER',
    'IDENTIFICATION_NUMBER',
    'ADDRESS',
    'DATE_OF_BIRTH',
    'GENDER'
];

class SettingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newBlockingRound: {
                name: '',
                blockingFields: []
            }
        }
    }

    componentDidMount() {
        this.props.action.getAllSettings();
    }

    handleOnChangeAlgorithm = (event) => {
        this.props.action.changeAlgorithm(event.target.value);
    };

    handleOnChangeManualScore = (score) => {
        this.props.action.changeManualScore(score);
    };

    handleOnChangeAutoScore = (score) => {
        this.props.action.changeAutoScore(score);
    };

    handleOnChangeFieldWeight = (event, index) => {
        this.props.action.changeFieldWeight(index, event.target.value === '' ? 0 : parseInt(event.target.value));
    };

    handleOnClickSaveAllSettings = (event) => {
        const error = [];

        const isManualScoreLessThanAutoScore = parseInt(this.props.settings[1].mpiValue) >= parseInt(this.props.settings[2].mpiValue);
        if (isManualScoreLessThanAutoScore) {
            error.push('Điểm số manual phải bé hơn auto');
        }

        const hasEnoughTotalScore = this.props.fieldWeights.reduce((cur, next) => cur + next.weight, 0) === 100;
        if (!hasEnoughTotalScore) {
            error.push('Tổng trọng số phải bằng 100');
        }

        if (error.length > 0) {
            toast(error.join('. '));
        } else {
            this.props.action.saveAllSettings();
        }
    };

    handleShowBlockingRoundDetails = (blockingRound) => {
        reactSwal.fire({
            icon: 'info',
            title: 'Thông tin chi tiết',
            html:
                <div>
                    <List>
                        {blockingRound.blockingFields.map(blockingField => {
                            return (
                                <ListItem key={blockingField.id}>
                                    <ListItemText primary={blockingField.field} />
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
                });
    };

    handleDeleteBlockingRound = (blockingRoundId) => {
        this.props.action.deleteBlockingRound(blockingRoundId);
    };

    handleOnChangeBlockingRoundName = (event) => {
        const {newBlockingRound} = this.state;
        newBlockingRound.name = event.target.value;
        this.setState({newBlockingRound});
    };

    handleToggleCheckbox = (field) => {
        let isChecked = false;
        this.state.newBlockingRound.blockingFields.forEach(blockingField => {
            if (blockingField.field === field) {
                isChecked = true;
            }
        });
        const newBlockingRound = JSON.parse(JSON.stringify(this.state.newBlockingRound));

        if (isChecked) {
            newBlockingRound.blockingFields = newBlockingRound.blockingFields.filter(blockingField => {
                return blockingField.field !== field;
            })
        } else {
            newBlockingRound.blockingFields.push({field});
        }

        this.setState({newBlockingRound});
    };

    handleShowNewBlockingRound = () => {
        reactSwal.fire({
            icon: 'question',
            title: 'Thêm mới block',
            html:
                <div>
                    <List>
                        <ListItem key={0}>
                            <TextField label='Tên blocking round' fullWidth={true} onChange={(event) => {this.handleOnChangeBlockingRoundName(event)}}/>
                        </ListItem>
                        {fields.map(field => {
                            return (
                                <ListItem key={field}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            onChange={() => this.handleToggleCheckbox(field)}
                                            inputProps={{ 'aria-labelledby': field }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={field} primary={field} />
                                </ListItem>
                            );
                        })}
                    </List>
                </div>,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                <Done/>,
            confirmButtonAriaLabel: 'Thêm mới',
            cancelButtonText:
                <Block/>,
            cancelButtonAriaLabel: 'Hủy'
        })
        .then(result => {
            if (result.value) {
               this.props.action.createBlockingRound(this.state.newBlockingRound);
               this.setState({
                   newBlockingRound: {
                       name: '',
                       blockingFields: []
                   }
               });
            }
        });
    };

    render() {
        const {settings, fieldWeights, blockingRounds} = this.props;

        return (
            <Layout authentication={this.props.authentication}>
                <Grid container justify='center'>
                    <Grid item xs={12}>
                        <Typography variant='h4' align='center' gutterBottom>
                            Cài đặt
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <CompareIcon  color='secondary'/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Thuật toán so sánh"
                            />
                        </ListItem>
                        <div style={{paddingLeft: '80px', paddingRight: '80px'}}>
                            <RadioGroup aria-label="algorithm" name="algorithm"  value={settings[0].mpiValue} onChange={(event) => this.handleOnChangeAlgorithm(event)} row={true}>
                                <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="Fuzzy Wuzzy"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="2"
                                    control={<Radio />}
                                    label="Levenshtein"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                        </div>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <BorderColorIcon  color='secondary'/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Điểm manual match"
                            />
                        </ListItem>
                        <div style={{paddingLeft: '80px', paddingRight: '80px', paddingTop: '30px'}}>
                            <Slider
                                defaultValue={parseInt(settings[1].mpiValue)}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-custom"
                                step={1}
                                valueLabelDisplay="on"
                                marks={marks}
                                color='secondary'
                                onChange={((event, value) => this.handleOnChangeManualScore(value))}
                            />
                        </div>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <LinkIcon  color='secondary'/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Điểm auto match"
                            />
                        </ListItem>
                        <div style={{paddingLeft: '80px', paddingRight: '80px', paddingTop: '30px'}}>
                            <Slider
                                defaultValue={parseInt(settings[2].mpiValue)}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-custom"
                                step={1}
                                valueLabelDisplay="on"
                                marks={marks}
                                color='secondary'
                                onChange={((event, value) => this.handleOnChangeAutoScore(value))}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PieChartIcon color='secondary'/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Cấu hình trọng số"
                            />
                        </ListItem>
                        <div style={{paddingLeft: '80px', paddingRight: '80px', paddingTop: '20px'}}>
                            <List>
                                {fieldWeights.map(fieldWeight => {
                                    return (
                                        <ListItem key={fieldWeight.id}>
                                            <TextField label={fieldWeight.field} value={fieldWeight.weight} onChange={event => this.handleOnChangeFieldWeight(event, fieldWeight.id - 1)}/>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </div>

                    </Grid>
                    <Grid item xs={4}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ViewDayIcon color='secondary'/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Cấu hình khối"
                            />
                        </ListItem>
                        <div style={{paddingLeft: '80px', paddingRight: '80px', paddingTop: '20px'}}>
                            <List>
                                {blockingRounds.map(blockingRound => {
                                    return (
                                        <ListItem key={blockingRound.id}>
                                            <ListItemText primary={blockingRound.name} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="comments" onClick={() => this.handleShowBlockingRoundDetails(blockingRound)}>
                                                    <InfoIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="comments"  onClick={() => this.handleDeleteBlockingRound(blockingRound.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    )
                                })}
                            </List>
                            <Button variant="outlined" color="primary" onClick={() => this.handleShowNewBlockingRound()}>
                                Thêm mới
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={(event) => this.handleOnClickSaveAllSettings()}>
                            Lưu cài đặt
                        </Button>
                    </Grid>
                </Grid>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.settingReducer,
        authentication: {
            accessToken: state.loginReducer.accessToken,
            userName: state.loginReducer.userName,
            roles: state.loginReducer.roles
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators(settingAction, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);