import { createMuiTheme } from '@material-ui/core/styles';
import { amber, cyan, grey } from '@material-ui/core/colors';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: amber[600],
        },
        secondary: {
            main: grey[700],
        },
    },
    typography: {
        fontFamily: [
            'Monospace',
            'Roboto',
            'Arial',
        ].join(','),
      },
});

export { darkTheme };