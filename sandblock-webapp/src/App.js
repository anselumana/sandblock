import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/common/navbar/Navbar';
import NetworkBar from './components/common/network/NetworkBar';
import Home from './components/views/home/Home';
import Box from './components/views/box/Box';
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import AutoReconnect from "./utils/AutoReconnect";
import { withSnackbar } from "./components/common/HOCs/withSnackbar";
import ChainChangeHelper from "./utils/ChainChangeHelper";

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

const autoReconnect = new AutoReconnect();
const chainChangeHelper = new ChainChangeHelper();

function App(props)  {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const web3 = useWeb3React();

    // Initialization
    useEffect(() => {
        async function init() {
            if (autoReconnect.shouldReconnect()) {
                await handleConnect();
            }
            setLoading(false);
        }
        init();
    }, []);

    // Chain change handling
    const chainId = web3.chainId;
    useEffect(() => {
        async function action() {
            console.log("chacking chain change...")
            if (chainChangeHelper.hasChanged(chainId)) {
                console.log("CHANGED!")
                handleDisconnect();
            }
        }
        action();
    }, [chainId]);

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
        props.showMessage("Connected successfully");
    }
    const onFailedConnection = (error) => {
        props.showMessage(error, "error");
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
        chainChangeHelper.reset();
        props.showMessage("Disconnected", "warning");
    }
    const onFailedDisconnection = (error) => {
        props.showMessage(error, "error");
    }
    

    return (
        <>
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
        </>
    );
}

export default withSnackbar(App);
