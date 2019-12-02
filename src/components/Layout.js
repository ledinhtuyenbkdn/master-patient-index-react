import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LeftDrawer from "./LeftDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Layout({authentication, children}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar authentication={authentication}/>
            <LeftDrawer authentication={authentication}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>

    );
}