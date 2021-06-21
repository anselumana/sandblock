import React, { useState } from "react";

export const withConnectionCheck = WrappedComponent => {
    return props => {
        const render = () => {
            
            return (
                <WrappedComponent {...props} showMessage={showMessage} />
            )
        }
        return render();
    };
};
