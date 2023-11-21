import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function DialogBox({ open, handleClose, title, description, type }) {
  const handleNo = () => {
    handleClose(false); // pass false to the handleClose function
  };

  const handleYes = () => {
    handleClose(true); // pass true to the handleClose function
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {type === 'confirmation' && (
          <Button onClick={handleNo} color="primary">
            NO
          </Button>
        )}
        <Button onClick={handleYes} color="primary" autoFocus>
          {type === 'informative' ? 'OK' : 'YES'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}