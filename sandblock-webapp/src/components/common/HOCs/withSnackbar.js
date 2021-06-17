import React, { useState } from "react";
import GenericSnackbar from "../snackbar/GenericSnackbar";

export const withSnackbar = WrappedComponent => {
  return props => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
        duration: 5000,
    });

    const showMessage = (message, severity = "success", duration = 5000) => {
        setSnackbar({
            open: true,
            message: message,
            severity: severity,
            duration: duration
        });
    };

    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const currentSnackbarSeverity = snackbar.severity;
        setSnackbar({
            open: false,
        });
    }

    return (
      <>
        <WrappedComponent {...props} showMessage={showMessage} />
        <GenericSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            duration={snackbar.duration}
            onClose={handleSnackbarClose}
        />
      </>
    );
  };
};
