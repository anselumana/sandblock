import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  container: {
    padding: "20px",
    maxWidth: 400,
    textAlign: "justify"
  },
  title: {
    paddingBottom: "20px"
  },
  info: {
    
  }
}));

function InfoMenu(props) {
  const classes = useStyles();

  const renderTitle = () => {
    return (
      <div className={classes.title}>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
        >
          Info
        </Typography>
      </div> 
    )
  };

  const renderInfos = () => {
    const infos = props.infos.map(info => {
      return (
        <div
          key={info}
          className={classes.info}
        > 
          <p>
            {info}
          </p>
        </div>
      );
    });
    return infos;
  }

  return (
    <div>
        <Drawer
          anchor="right"
          open={props.isOpen}
          onClose={(e) => props.toggleMenu(e, false)}
          className={classes.root}
        >
          <div className={classes.container}>
            {renderTitle()}
            {renderInfos()}
          </div>
        </Drawer>
    </div>
  );
}

export default InfoMenu;