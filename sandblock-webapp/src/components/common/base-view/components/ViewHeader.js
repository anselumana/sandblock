import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import InfoButton from './InfoButton';


const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: theme.spacing(1)
    },
    viewInfo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    }
}));

function ViewHeader(props) {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <div className={classes.title}>
                <Typography
                    component="h1"
                    variant="h3"
                    color="primary"
                >
                    {props.title}
                </Typography>
            </div>
            <Typography
                component="h1"
                variant="h6"
            >
                {props.subtitle}
            </Typography>
            <div className={classes.viewInfo}>
                <small>
                    View info&nbsp;
                </small>
                <InfoButton
                    onClick={(e) => props.toggleMenu(e, true)}
                />
            </div>
        </div>
    );
}

export default ViewHeader;