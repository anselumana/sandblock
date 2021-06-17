import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Error from '../error/Error';
import Loading from '../../common/progress/Loading';
import BoxContract from '../../../smart-contract-artifacts/Box.json';
import { useWeb3React } from "@web3-react/core";
import { withSnackbar } from '../../common/HOCs/withSnackbar';

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8)
    },
    setGroup: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginTop: theme.spacing(4)
    },
    getGroup: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: theme.spacing(4)
    },
    setButton: {
      height: "100%"
    }
}));

function Box(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("");
    const [blockchainValue, setBlockchainValue] = useState("");
    const [boxContract, setBoxContract] = useState(null);
    const [error, setError] = useState("");
    const web3 = useWeb3React();

    const boxContractLoaded = Boolean(boxContract);

    useEffect(() => {
        async function init() {
            if (web3.active) {
                await loadBoxContract();
                if (boxContractLoaded) {
                    await updateData();
                }
            }
            setLoading(false);
        }
        init();
    }, [web3, boxContractLoaded]);


    const loadBoxContract = async () => {
        const networkId = await web3.library.eth.net.getId();
        const contractNetworkData = BoxContract.networks[networkId];
        if (contractNetworkData) {
            const box = new web3.library.eth.Contract(BoxContract.abi, contractNetworkData.address);
            setBoxContract(box);
        }
        else {
            setError(`"Box" smart-contract not found in the current network (network ID: ${networkId})`);
        }
    }

    const updateData = async () => {
        const _value = await boxContract.methods.get().call();
        setBlockchainValue(_value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (value) {
            // Contract call
            await boxContract.methods.set(value.toString())
                .send({from: web3.account})
                .on('error', error => {
                    props.showMessage(error.message, "error");
                })
                .on('transactionHash', transactionHash => {
                    props.showMessage(`Sent TX ${transactionHash}. It might take some time to be received and confirmed.`);
                    setValue(""); // Reset input filed
                })
                .on('receipt', receipt => {
                    props.showMessage(`TX ${receipt.transactionHash} has been received. Added to block ${receipt.blockNumber}`);
                })
                .on('confirmation', (confirmationNumber, receipt) => {
                    if (confirmationNumber === 3) {
                        props.showMessage(`Received the 3rd confirmation for TX ${receipt.transactionHash}`);
                    }
                })
                .then(data => {
                });;
            await updateData();
        }
    }

    const render = () => {
        if (loading) {
            return (
                <Loading />
            );
        }
        else {
            if (web3.active) {
                if (error) {
                    return (
                        <Error
                            title="Generic error"
                            messages={[error]}
                        />
                    );
                }
                else {
                    return  renderBox();
                }
            }
            else {
                return (
                    <Error
                        title="Not connected"
                        messages={["Connect your wallet to use this function"]}
                    />
                );
            }
        }
    }

    const renderBox = () => {
        return (
            <div>
                <form
                    className={classes.setGroup}
                    onSubmit={handleSubmit}
                >
                    <Grid container justify="center" spacing={0}>
                        <Grid key="input" item>
                            <TextField
                                label="Value"
                                variant="outlined"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </Grid>
                        <Grid key="button" item>
                            <Button
                                type="submit"
                                color="primary"
                                variant="outlined"
                                className={classes.setButton}
                            >
                                set
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <div className={classes.getGroup}>
                    <TextField
                        disabled
                        fullWidth
                        label="Current value"
                        helperText="Data source: blockchain"
                        variant="outlined"
                        value={blockchainValue}
                    />
                </div>
            </div>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.root}>
                {render()}
            </div>
        </Container>
    );
}

export default withSnackbar(Box);