import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';


const useStyles = makeStyles((theme) => ({
    root: {
        cursor: "pointer"
    },
  }));

function InfoButton(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <InfoTwoToneIcon
                fontSize={props.fontSize ? props.fontSize : "small"}
                onClick={props.onClick}
            />
        </div>
    );
}

export default InfoButton;