import React, { useState } from "react";
import { withPageStructure } from "../HOCs/withPageStructure";
import { withSnackbar } from "../HOCs/withSnackbar";

export const defaultConfig = {
    pageStructure: {
        enabled: true,
        title: "",
        subtitle: "",
        infos: []
    },
    connectionCheck: {
        enabled: true,
    },
    snackbar: {
        enabled: true,
    }
};

export const createView = (WrappedComponent, config = defaultConfig) => {
    return props => {
        // Set view to raw component with passed props
        let View = <WrappedComponent {...props} />;
        // Compose view based on config
        if (config.pageStructure && config.pageStructure.enabled) {
            View = withPageStructure(View, config.pageStructure);
        }
        if (config.connectionCheck && config.connectionCheck.enabled) {

        }
        if (config.snackbar && config.snackbar.enabled) {
            View = withSnackbar(View)
        }

        console.log(<View />)
        const render = () => {
            return (
                <View />
            )
        }
        return render();
    };
};