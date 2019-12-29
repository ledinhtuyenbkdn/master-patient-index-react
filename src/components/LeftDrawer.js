import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DomainIcon from '@material-ui/icons/Domain';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import {Link} from "react-router-dom";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

function ListItemLink(props) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
                // See https://github.com/ReactTraining/react-router/issues/6056
                <Link to={to} {...itemProps} innerRef={ref} />
            )),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

export default function LeftDrawer({authentication}) {
    const classes = useStyles();

    const isAuthenticated = authentication !== null && authentication.userName !== null;

    const isAdmin = isAuthenticated && authentication.roles.includes('ROLE_ADMIN');

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar}/>
            {isAuthenticated &&
            <List>
                <ListItemLink to="/dashboard" primary="Dashboard" icon={<DashboardIcon />} />
                <ListItemLink to="/persons" primary="Bệnh nhân" icon={<PersonIcon />} />
                <ListItemLink to="/master-persons" primary="Định danh" icon={<AssignmentIndIcon />} />
                <ListItemLink to="/review-links" primary="Duyệt thủ công" icon={<BorderColorIcon />} />
            </List>}
            <Divider/>
            {isAdmin &&
            <List>
                <ListItemLink to="/health-centers" primary="Cơ sở y tế" icon={<DomainIcon />} />
                <ListItemLink to="/users" primary="Quản lý người dùng" icon={<SupervisedUserCircleIcon />} />
                <ListItemLink to="/settings" primary="Cài đặt" icon={<SettingsIcon />} />

            </List>}
            <Divider/>
            <List>
                <ListItemLink to="/" primary="Giới thiệu sản phẩm" icon={<InfoIcon />} />
            </List>
        </Drawer>
    );
}
