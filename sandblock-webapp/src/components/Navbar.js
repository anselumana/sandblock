import React, { useState } from 'react';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  space: {
    flexGrow: 1,
  },
  logo: {
      height: "50",
      width: "50px",
  },
  navTitle: {
    display: "flex",
    flexDirection: "row",  
  }
}));

function Navbar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                  <div className={classes.navTitle}>
                    <img
                        src="./sandblock_logo_amber.png"
                        alt="logo"
                        className={classes.logo}
                    />
                    <Typography
                        component="h1"
                        variant="h6"
                    >
                        &nbsp;{">_"} 
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="primary"
                    >
                        &nbsp;sandblock
                    </Typography>
                  </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;