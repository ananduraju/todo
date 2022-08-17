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
  CircularProgress,
} from "@mui/material";
import { url } from "../../custom/data";
import getWindowDimensions from "../../custom/windowDimensions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Compose({ show, setShow, phone }) {
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [severity, setSeverity] = useState("success");
  const [composeMsg, setComposeMsg] = useState("");
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
  };

  const send = () => {
    setLoading(true);
    fetch(`${url}/sms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg: composeMsg,
        phone,
      }),
    })
      .then((res) => res.json())
      .then(({ msg }) => {
        setLoading(false);
        setShow(false);
        // console.log(msg);
        if (msg === "failed") {
          setOpenSnack(true);
          setSeverity("error");
          setAlertText("Number not registered in twilio");
          return;
        }
        setOpenSnack(true);
        setSeverity("success");
        setAlertText("message delivered successfully");
      });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setComposeMsg(
      `Hi. Your OTP is ${Math.floor(Math.random() * 900000 + 100000)}`
    );
  }, [show]);

  return (
    <>
      <Snackbar
        open={openSnack}
        // anchorOrigin={{ vertical:'left,', horizontal:'center' }}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnack(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnack(false);
          }}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {alertText}
        </Alert>
      </Snackbar>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setShow(false);
          setLoading(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Compose message"}</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-basic"
            label="message"
            variant="filled"
            value={composeMsg}
            onChange={(e) => {
              // setComposeMsg(e.target.value);
              setOpenSnack(true);
              setSeverity("warning");
              setAlertText("Can't edit OTP");
            }}
            style={{
              width: windowDimensions.width <= 950 ? "70vw" : "20vw",
              marginRight: "2%",
            }}
          />
        </DialogContent>
        <DialogActions>
          {!loading ? (
            <Button onClick={send}>Send</Button>
          ) : (
            <CircularProgress style={{ margin: "2%" }} />
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
