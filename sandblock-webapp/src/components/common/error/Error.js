import React, { useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: theme.spacing(8)
    },
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: theme.spacing(1)
    },
    paper: {
        padding: "15px"
    }
}));

function Error(props) {
    const classes = useStyles();

    const renderMessages = () => {
        if (props.messages && props.messages.length > 0){
            return props.messages.map(msg => {
                return (
                    <Typography
                        component="h2"
                        variant="h6"
                        key={msg}
                    >
                        {">_"}&nbsp;{msg}
                    </Typography>
                );
            });
        }
        else{
            return <div/>
        }
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.title}>
                    <Typography
                        component="h1"
                        variant="h5"
                        color="primary"
                    >
                        {props.title}
                    </Typography>
                </div>
                {renderMessages()}
            </Paper>
        </div>
    );
}

export default Error;