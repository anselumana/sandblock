import MuiAlert from '@material-ui/lab/Alert';

function SnackbarAlert(props) {
    return (
        <MuiAlert
            elevation={6}
            variant="filled"
            {...props}
        />
    )
}

export default SnackbarAlert;