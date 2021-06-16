import React, { useState } from 'react';
import { Grid, AppBar, Toolbar, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NetworkStatus from './NetworkStatus';
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    column: {
        // flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    },
    networkItem: {
        padding: "8px"
    },
    paper: {
        padding: "8px",
        display: "flex"
    }
}));

function NetworkBar(props) {
    const classes = useStyles();
    const web3 = useWeb3React();
    
    const renderNetworkStatusInfo = () => {
        return (
            <div className={classes.networkItem}>
                <Paper className={classes.paper}>
                    Network status:&nbsp;{renderNetworkStatus()}
                </Paper>
            </div>
        );
    }
    const renderNetworkStatus = () => {
        return <NetworkStatus connected={web3.active} />
    }
    const renderNetworkNameInfo = () => {
        if (web3.active) {
            return (
                <div className={classes.networkItem}>
                    <Paper className={classes.paper}>
                        Network:&nbsp;<b>{renderNetworkName()}</b>
                    </Paper>
                </div>
            );
        }
        else{
            return <div/>
        }
    }
    const renderNetworkName = () => {
        if (web3.active) {
            let networkName = getNetworkName();
            return `${networkName} (ID: ${web3.chainId ? web3.chainId : "unknown"})`;
        }
        else {
            return "/"
        }
    }
    const getNetworkName = () => {
        let name = "unknown";
        const id = web3.chainId;
        if (id === 1) {
            name = "Mainnet"
        }
        else if (id === 3) {
            name = "Ropsten"
        }
        else if (id === 4) {
            name = "Rinkeby"
        }
        else if (id === 5) {
            name = "Goerli"
        }
        else if (id === 42) {
            name = "Kovan"
        }
        else if (id === 1337) {
            name = "Localhost"
        }
        return name;
    }
    const renderAccountInfo = () => {
        if (web3.active) {
            return (
                <div className={classes.networkItem}>
                    <Paper className={classes.paper}>
                        Account:&nbsp;<b>{renderAccount()}</b>
                    </Paper>
                </div>
            );
        }
        else{
            return <div/>
        }
    }
    const renderAccount = () => {
        if (web3.active) {
            return web3.account ? web3.account : "unknown";
        }
        else {
            return "/"
        }
    }

    return (
        <AppBar position="static" color="secondary">
            <div className={classes.root}>
                <div className={classes.column}>
                    {renderNetworkStatusInfo()}
                </div>
                <div className={classes.column}>
                    {renderNetworkNameInfo()}
                </div>
                <div className={classes.column}>
                    {renderAccountInfo()}
                </div>
            </div>
        </AppBar>
    );
}

export default NetworkBar;