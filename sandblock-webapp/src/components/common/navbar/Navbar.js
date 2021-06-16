import React, { useState } from 'react';
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../Link';
import NavbarTitle from './NavbarTitle';
import LateralMenu from './LateralMenu';
import LateralMenuButton from './LateralMenuButton';
import { useWeb3React } from "@web3-react/core";

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
    const web3 = useWeb3React();
    const [lateralMenuOpen, setLateralMenuOpen] = useState(false);

    const toggleLateralMenu = (event, open) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setLateralMenuOpen(open);
    }


    const handleClick = (e) => {
      if (web3.active) {
        props.onDisconnect();
      }
      else {
        props.onConnect();
      }
    }

    const getButtonText = () => {
      return web3.active ? "disconnect" : "connect";
    }

    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="inherit">
              <Toolbar>
                <LateralMenuButton
                  onClick={(e) => toggleLateralMenu(e, true)}
                />
                <Link to="/home">
                  <NavbarTitle />
                </Link>
                <div className={classes.space} />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={handleClick}
                  >
                    {getButtonText()}
                  </Button>
              </Toolbar>
          </AppBar>
        </div>
        <LateralMenu
            isOpen={lateralMenuOpen}
            toggleLateralMenu={toggleLateralMenu}
        />
      </div>
    );
}

export default Navbar;