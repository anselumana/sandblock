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

function App(props)  {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const web3 = useWeb3React();
    const connectionStatusKey = "connectionStatus";


    const connectionActive = web3.active;

    // Initialization
    useEffect(() => {
        async function init() {
            if (shouldReconnect()) {
                await handleConnect();
            }
        }
        init();
    }, []);

    const saveConnectionStatus = (connected) => {
        if (connected) {
            localStorage.setItem(connectionStatusKey, "connected");
        }
        else {
            localStorage.setItem(connectionStatusKey, "disconnected");
        }
    }

    const shouldReconnect = () => {
        // Should implement a logic like with refresh tokens:
        // set an expiry for the last connection and refresh it
        // if almost expired (in this case just need to refresh the expiry
        // (no need to redo the connection))
        const status = localStorage.getItem(connectionStatusKey);
        if (status === "connected") {
            return true;
        }
        return false;
    }

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
        saveConnectionStatus(true);
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
        saveConnectionStatus(false);
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
