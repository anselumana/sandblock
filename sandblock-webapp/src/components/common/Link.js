import { makeStyles } from '@material-ui/core/styles';
import { Link as BrowserLink } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    custom: {
        color: "inherit",
        textDecoration: "none"
    },
}));


function Link(props) {
    const classes = useStyles();
    return (
        <BrowserLink to={props.to} className={classes.custom}>
            {props.children}
        </BrowserLink>
    )
}

export default Link;