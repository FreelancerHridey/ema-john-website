import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1,2),
      width: '25ch',
      textAlign: "center",
    },
    
  },
}));


const Shipment = () => {
    const classes = useStyles();
    return (
        <div  className={classes.root}>
            <form styles={{marginLeft: "100px" }} className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Enter your name" />
                <TextField id="standard-basic" label="Enter email address" />
                <TextField id="standard-basic" label="Enter phone number" />
                <Button variant="contained" color="primary">Submit</Button>
            </form>
        </div>
    );
};

export default Shipment;