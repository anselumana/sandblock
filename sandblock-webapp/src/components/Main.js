import React, { useState, useEffect } from 'react';
import { Typography, ButtonGroup, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8)
  },
  setGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: theme.spacing(4)
  },
  getGroup: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: theme.spacing(4)
  },
  setButton: {
    height: "100%"
  }
}));

function Main(props) {
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [blockchainValue, setBlockchainValue] = useState("/");

    // Initialization
    useEffect(() => {
        async function init() {
            await updateData();
        }
        init();
    }, []);

    const updateData = async () => {
      const _value = await props.boxContract.methods.get().call();
      setBlockchainValue(_value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (value) {
        await props.boxContract.methods.set(value.toString()).call();
        await updateData();
        setValue("");
      }
    }

    return (
        <div className={classes.root}>
            <Typography
                component="h1"
                variant="h6"
                color="primary"
            >
              {">_ simple GET/SET value"}
            </Typography>
            <form className={classes.setGroup} onSubmit={handleSubmit}>
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={0}>
                    <Grid key="input" item>
                      <TextField
                        label="Value"
                        variant="outlined"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </Grid>
                    <Grid key="button" item>
                      <Button
                        type="submit"
                        color="primary"
                        variant="outlined"
                        className={classes.setButton}
                      >
                        set
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <div className={classes.getGroup}>
              <TextField
                  disabled
                  fullWidth
                  label="Current value"
                  helperText="Data source: blockchain"
                  variant="outlined"
                  value={blockchainValue}
              />
            </div>
        </div>
    );
}

export default Main;