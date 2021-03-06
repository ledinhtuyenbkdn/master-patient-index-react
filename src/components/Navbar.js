import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

function redirectToLogin() {
    window.location.href = '/login'
}

function redirectToLogout() {
    window.location.href = '/logout'
}

export default function Navbar({authentication}) {
    const classes = useStyles();

    const isAuthenticated = authentication !== null && authentication.userName !== null;

    return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Master Patient Index
                    </Typography>
                    {!isAuthenticated && <Button color="inherit" onClick={redirectToLogin}>Đăng nhập</Button>}
                    {isAuthenticated && <Button color="inherit" onClick={redirectToLogout}>Đăng xuất</Button>}
                </Toolbar>
            </AppBar>
    );
}

