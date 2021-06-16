import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import CheckBoxTwoToneIcon from '@material-ui/icons/CheckBoxTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import { render } from 'react-dom';

const useStyles = makeStyles((theme) => ({
    success: {
      color: "limegreen"
    },
    error: {
      color: "red"
    }
}));

function NetworkStatus(props) {
  const classes = useStyles();
  const render = () => {
    if (props.connected) {
      return (
        <div className={classes.success}>
          <b>Connected</b>
        </div>
      );
    }
    else{
      return (
        <div className={classes.error}>
          <b>Disconnected</b>
        </div>
      );
    }
  }
  return render();
}

export default NetworkStatus;