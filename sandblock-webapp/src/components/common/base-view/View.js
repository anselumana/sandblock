import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ViewHeader from './components/ViewHeader';
import InfoMenu from './components/InfoMenu';
import Error from '../error/Error';
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles((theme) => ({
    header: {
        marginTop: theme.spacing(8)
    }
}));

function View(props) {
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);
    const web3 = useWeb3React();

    const toggleMenu = (event, open) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMenuOpen(open);
    }

    const render = () => {
        if (web3.active) {
            return renderView();
        }
        else {
            // TODO: better error view/feedback
            return (
                <Error
                    title="Not connected"
                    messages={["Connect your wallet to use this function"]}
                />
            );
        }
    }

    const renderView = () => {
        return (
            <>
                <div className={classes.header}>
                    <ViewHeader
                        title={props.title}
                        subtitle={props.subtitle}
                        toggleMenu={toggleMenu}
                    />
                </div>
                <Container
                    component="main"
                    maxWidth="xs"
                >
                    {props.children}
                </Container>
                <InfoMenu
                    isOpen={menuOpen}
                    infos={props.infos}
                    toggleMenu={toggleMenu}
                />
            </>
        );
    }

    return render();
}

export default View;