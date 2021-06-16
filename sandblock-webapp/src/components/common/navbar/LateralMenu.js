import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List } from '@material-ui/core';
import LateralMenuEntry from './LateralMenuEntry';
import WidgetsTwoToneIcon from '@material-ui/icons/WidgetsTwoTone';

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

function LateralMenu(props) {
  const classes = useStyles();

  const renderEntries = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={(e) => props.toggleLateralMenu(e, false)}
      onKeyDown={(e) => props.toggleLateralMenu(e, false)}
    >
      <List>
          <LateralMenuEntry
            title=">_ Box"
            linkTo="/box"
            icon={<WidgetsTwoToneIcon />}
          />
      </List>
    </div>
  );

  return (
    <div>
        <Drawer
          anchor="left"
          open={props.isOpen}
          onClose={(e) => props.toggleLateralMenu(e, false)}
        >
            {renderEntries()}
        </Drawer>
    </div>
  );
}

export default LateralMenu;