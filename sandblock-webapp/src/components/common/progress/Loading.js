import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: theme.spacing(8)
    },
}));


function Loading(props) {
    const classes = useStyles();
    return (
        <div className={classes.root} color="secondary">
            {">_ Loading..."}
        </div>
    );
}

export default Loading;