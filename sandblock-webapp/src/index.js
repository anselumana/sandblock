import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import App from './App';
import { darkTheme } from './themes/Themes';

// Use this method to configure which web3 library will be used in the app.
// To consume it, call the hook "const web3 = useWeb3React()", and the library
// will be available as the "web3.library" Object.
// (Remember: you must call web3.activate() in order to enstablish a connection)
function getLibrary(provider, connector) {
    return new Web3(provider);
}

const mountPoint = document.getElementById('root');

ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                    <CssBaseline/>
                    <App />
            </ThemeProvider>
        </BrowserRouter>
    </Web3ReactProvider>,
    mountPoint
);