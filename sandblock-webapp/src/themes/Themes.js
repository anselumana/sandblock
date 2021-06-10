import { createMuiTheme } from '@material-ui/core/styles';
import { amber, cyan } from '@material-ui/core/colors';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: amber[600],
        },
        secondary: {
            main: cyan[600],
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