import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Link from '../Link';


function LateralMenuEntry(props) {
    return (
        <Link to={props.linkTo}>
            <ListItem button key={props.title}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.title} />
            </ListItem>
        </Link>
    );
}

export default LateralMenuEntry;