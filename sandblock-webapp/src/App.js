import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { darkTheme } from './themes/Themes';
import Navbar from './components/common/navbar/Navbar';
import NetworkBar from './components/common/network/NetworkBar';
import Home from './components/views/home/Home';
import Box from './components/views/box/Box';
import GenericSnackbar from "./components/common/snackbar/GenericSnackbar";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import AutoReconnect from "./utils/auto-reconnect";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: theme.spacing(8),
    },
    space: {
        height: theme.spacing(4)
    },
}));

const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 1337],
});

console.log("re-instanciating AutoReconnect")
const autoReconnect = new AutoReconnect();

function App(props)  {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const web3 = useWeb3React();

    // Initialization
    useEffect(() => {
        async function init() {
            if (autoReconnect.shouldReconnect()) {
                await handleConnect();
            }
        }
        init();
    }, []);

    const handleConnect = async () => {
        try {
            await web3.activate(injected, undefined, true);
            onSuccessfulConnection();
        }
        catch (error) {
            onFailedConnection(error.message);
        }
    }
    const onSuccessfulConnection = () => {
        autoReconnect.onConnect();
        setSnackbar({
            open: true,
            message: "Connected successfully",
            severity: "success",
        });
    }
    const onFailedConnection = (error) => {
        setSnackbar({
            open: true,
            message: error,
            severity: "error",
        });
    }

    const handleDisconnect = async () => {
        try {
            web3.deactivate();
            onSuccessfulDisconnection();
        }
        catch (error) {
            onFailedDisconnection(error.message);
        }
    }
    const onSuccessfulDisconnection = () => {
        autoReconnect.onDisconnect();
        setSnackbar({
            open: true,
            message: "Disconnected",
            severity: "warning",
        });
    }
    const onFailedDisconnection = (error) => {
        setSnackbar({
            open: true,
            message: error,
            severity: "error",
        });
    }
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const currentSnackbarSeverity = snackbar.severity;
        setSnackbar({
            open: false,
            message: "",
            severity: currentSnackbarSeverity,
        });
    }

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Navbar
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect} />
                <NetworkBar />
                <Switch>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path="/box">
                        <Box />
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route path="*">
                        <div>{">_ Sorry, page not found"}</div>
                    </Route>
                </Switch>
                <GenericSnackbar
                    open={snackbar.open}
                    onClose={handleSnackbarClose}
                    message={snackbar.message}
                    severity={snackbar.severity} />
            </ThemeProvider>
        </div>
    );
}

export default App;
