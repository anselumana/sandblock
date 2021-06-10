import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from 'web3';
import { darkTheme } from './themes/Themes';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Head from './components/Head';
import BoxContract from './smart-contract-artifacts/Box.json';

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

function App(props)  {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [isEthereumBrowser, setIsEthereumBrowser] = useState(false);
    const [componentsLoaded, setCOmponentsLoaded] = useState(false);
    const [account, setAccount] = useState("0x0");
    const [box, setBox] = useState(null);

    // Initialization
    useEffect(() => {
        async function init() {
            await loadWeb3();
            await loadBlockchainData();
        }
        init();
    }, []);

    const loadWeb3 = async () => {
        let ethBrowser = true;
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        }
        else {
            alert("You are using a non-ethereum browser. Consider using MetaMask");
            ethBrowser = false;
        }
        if (ethBrowser) {
            setIsEthereumBrowser(true);
        }
    }
    
    const loadBlockchainData = async () => {
        const web3 = window.web3;
        // Get accounts
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        // Get network ID
        const networkId = await web3.eth.net.getId();
        // Load Box contract
        const boxContract = BoxContract.networks[networkId];
        if (boxContract) {
            const box = new web3.eth.Contract(BoxContract.abi, boxContract.address);
            setBox(box);
            setCOmponentsLoaded(true);
        }
        else {
            alert(`Box smart-contract not found in the current network (network ID: ${networkId})`);
        }
        setLoading(false);
    }

    const render = () => {
        if (loading) {
            // return renderLoading();
            return (
                <Typography
                    component="h1"
                    variant="h6"
                    color="secondary"
                >
                    {">_ loading..."}
                </Typography>
            );
        }
        else {
            if (isEthereumBrowser) {
                if (componentsLoaded) {
                    return renderBody();
                }
                else {
                    // return renderError(["unable to load all essential components"]);
                    return (
                        <Typography
                            component="h1"
                            variant="h6"
                            color="secondary"
                        >
                            {">_ unable to load all essential components"}
                        </Typography>
                    );
                }
            }
            else {
                // return renderError(["non-ethereum browser", "cannot use app"]);
                return (
                    <div>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="secondary"
                        >
                            {">_ non-ethereum browser"}
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="secondary"
                        >
                            {">_ cannot use app"}
                        </Typography>
                    </div>
                );
            }
        }
    }

    const renderBody = () => {
        return (
            <Container component="main" maxWidth="md">
                <div className={classes.paper}>
                    <Head />
                    <Main
                        account={account}
                        boxContract={box}
                    />
                </div>
            </Container>
        )
    }

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Navbar />
                {render()}
            </ThemeProvider>
        </div>
    );
}

export default App;
