import React, { useEffect, useState } from "react";
import {
  TextField,
  Snackbar,
  Alert,
  Slide,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { contacts } from "../../custom/data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowMsgs({ show, setShow, msg }) {
  const [messages, setMessages] = useState([]);

  const findName = (phone) => {
    // console.log(phone);
    let val;
    contacts.forEach((contact) => {
      if (contact.phone === phone) {
        val = contact;
        // console.log(val);
        // console.log("val", val);
        return;
      }
    });
    return `${val.first} ${val.last}`;
  };

  useEffect(() => {
    let arr = msg.split("$");
    arr = arr.filter((a) => a !== "");
    arr = arr.map((a) => JSON.parse(a));
    arr.forEach((a) => (a.name = findName(a.phone)));
    // console.log(arr);
    setMessages(arr);
  }, [msg]);
  return (
    <>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShow(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Previous messages"}</DialogTitle>
        <DialogContent>
          <div style={{ height: "30vh" }}>
            {messages.reverse().map((message, index) => {
              return (
                <div key={index}>
                  <Typography variant="h5" component="div">
                    {message.date}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    message: {message.log}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    phone: {message.phone}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    name: {message.name}
                  </Typography>
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
