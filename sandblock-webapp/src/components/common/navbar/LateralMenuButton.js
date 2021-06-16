import React from 'react';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    }
  }));

function LateralMenuButton(props) {
    const classes = useStyles();

    return (
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.onClick}
        >
            <MenuIcon />
        </IconButton>
    );
}

export default LateralMenuButton;
