import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

function NavbarTitle(props) {
    const classes = useStyles();
    return (
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
    );
}

export default NavbarTitle;