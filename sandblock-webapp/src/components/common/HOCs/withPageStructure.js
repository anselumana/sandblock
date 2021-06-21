import React, { useState } from "react";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InfoMenu from "../pageinfo/InfoMenu";
import InfoButton from "../pageinfo/InfoButton";

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: theme.spacing(8)
    },
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: theme.spacing(1)
    },
    viewInfo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    }
}));

export const withPageStructure = (WrappedComponent, { title = "", subtitle = "", infos = [] } ) => {
  return props => {
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = (event, open) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuOpen(open);
    }

    const renderTitle = () => {
        return (
            <>
                <Typography
                    component="h1"
                    variant="h3"
                    color="primary"
                >
                    {title ? title : "page"}
                </Typography>
            </>
        )
    }

    const renderSubtitles = () => {
        return (
            <Typography
                component="h1"
                variant="h6"
            >
                {subtitle}
            </Typography>
        );
    }

    return (
      <>
        <div className={classes.header}>
            <div className={classes.title}>
                {renderTitle()}
            </div>
            {renderSubtitles()}
            <div className={classes.viewInfo}>
                <small>
                    View info&nbsp;
                </small>
                <InfoButton
                    onClick={(e) => toggleMenu(e, true)}
                />
            </div>
        </div>
        <WrappedComponent {...props} />
        <InfoMenu
            isOpen={menuOpen}
            infos={infos}
            toggleMenu={toggleMenu}
        />
      </>
    );
  };
};
