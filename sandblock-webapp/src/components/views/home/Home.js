import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
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
    logo: {
        height: "100px",
        width: "100px",
    }
}));

function Home(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <img
                    src="./sandblock_logo_amber.png"
                    alt="logo"
                    className={classes.logo}
                />
                <Typography
                    component="h1"
                    variant="h3"
                >
                    &nbsp;{">_"} 
                </Typography>
                <Typography
                    component="h1"
                    variant="h3"
                    color="primary"
                >
                    &nbsp;sandblock
                </Typography>
            </div>
            <Typography
                component="h1"
                variant="h6"
            >
                Blockchain development sandbox
            </Typography>
        </div>
    );
}

export default Home;