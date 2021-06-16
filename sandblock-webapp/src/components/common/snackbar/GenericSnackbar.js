import React from 'react';
import { Snackbar } from '@material-ui/core';
import SnackbarAlert from './SnackbarAlert';

function GenericSnackbar(props) {
    return (
        <Snackbar
            open={props.open}
            autoHideDuration={6000}
            onClose={props.onClose}
            key={props.message}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
        >
            <SnackbarAlert
                onClose={props.onClose}
                severity={props.severity}
            >
                {props.message}
            </SnackbarAlert>
        </Snackbar>
    );
}

export default GenericSnackbar;