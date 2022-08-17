import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Stack,
  IconButton,
  Divider,
  Box,
  Paper,
  CardContent,
  CardActions,
  Card,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  FilledInput,
  List,
  ListItemText,
  ListItem,
  Checkbox,
  CircularProgress,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSpring, animated, easings } from "react-spring";
import getWindowDimensions from "../../custom/windowDimensions";
import { browserName, isMobile } from "react-device-detect";
import { contacts } from "../../custom/data";
import { Person } from "@mui/icons-material";
import Compose from "./Compose";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#663399",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SendMessages() {
  const [contactName, setContactName] = useState();
  const [open, setOpen] = useState(false);
  const [anim, setAnim] = useState(false);
  const [anim2, setAnim2] = useState(false);
  const [anim3, setAnim3] = useState(false);
  const [animC1, setAnimC1] = useState(false);
  const [animC2, setAnimC2] = useState(false);
  const [animC3, setAnimC3] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const props = useSpring({
    margin: anim ? "5%" : "15%",
    height: anim ? "auto" : windowDimensions.width <= 500 ? "18vw" : "5vh",
    height2: anim3 ? "30vh" : "0vh",
    opacity: anim3 ? 1 : 0,
    scale2: anim2 ? 1 : 0,
    scale3: anim3 ? 1 : 0,
    c1: animC1 ? 1 : 0,
    c2: animC2 ? 1 : 0,
    c3: animC3 ? 1 : 0,
    translateY: anim ? 1 : 0,
    // opacity: anim ? 1 : 0,
    background: anim ? "red" : "green",
    config: { duration: 1000, easing: easings.easeInOutQuint },
  });

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
  };

  useEffect(() => {
    setAnim2(true);
    setAnim(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const PaperContent = () => {
    return (
      <>
        <animated.div
          style={{
            zIndex: 2,
          }}
        >
          <Typography
            style={{
              color: "rebeccapurple",
              fontFamily: "gillsans",
              fontSize:
                windowDimensions.width <= 1000
                  ? `${windowDimensions.width / 210}rem`
                  : windowDimensions.width <= 1300
                  ? `${windowDimensions.width / 310}rem`
                  : "4rem",
              marginTop: "15%",
            }}
          >
            Simple Contacts Web App
          </Typography>
        </animated.div>
        <animated.div
          style={{
            // background: "red",
            margin: props.margin,
            width: windowDimensions.width <= 950 ? "100%" : "60%",
            height: props.height,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <animated.div
            style={{
              //   background: "red",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              scale: props.scale2.to({
                range: [0, 0.6, 1],
                output:
                  windowDimensions.width <= 500 ? [0, 1.2, 0.9] : [0, 1.2, 1],
              }),
            }}
          >
            <FormControl
              variant="filled"
              sx={{
                m: 1,
                minWidth: 120,
                width: windowDimensions.width <= 950 ? "80vw" : "25vw",
              }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Contacts
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={contactName}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setContactName(e.target.value);
                  setShowContact(true);
                  setAnim3(true);
                }}
                label="Contacts"
              >
                {contacts.map((contact) => (
                  <MenuItem
                    key={contact.index}
                    value={contact}
                  >{`${contact.first} ${contact.last}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {showContact && (
              <animated.div
                style={{
                  //   background: "red",
                  width: windowDimensions.width <= 950 ? "70vw" : "20vw",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: props.height2,
                  opacity: props.opacity.to({
                    range: [0, 0.5, 1],
                    output: [0, 0, 1],
                  }),
                }}
              >
                <Person
                  sx={{
                    fontSize: "5rem",
                    color: "rebeccapurple",
                    marginTop: "2%",
                  }}
                />
                <Typography style={{ margin: "2%" }}>
                  {contactName.first === "Anandu"
                    ? "Registered"
                    : "Not Registered"}
                </Typography>
                <Typography />
                <Typography
                  style={{ margin: "2%" }}
                >{`${contactName.first} ${contactName.last}`}</Typography>
                <Typography
                  style={{ margin: "2%" }}
                >{`phone: ${contactName.phone}`}</Typography>
                <ThemeProvider theme={theme}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{
                      margin: "2%",
                    }}
                    onClick={() => setOpen(true)}
                  >
                    send message
                  </Button>
                </ThemeProvider>
              </animated.div>
            )}
          </animated.div>
        </animated.div>
      </>
    );
  };
  return (
    <div
      style={{
        background: "linear-gradient(to right top,indigo,lavender)",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <animated.div
        style={{
          width: windowDimensions.width <= 950 ? "95%" : "60%",
          zIndex: 2,
          margin: windowDimensions.width <= 950 ? "50%" : "10%",
          //   scale: props.scale,
          //   opacity: props.opacity,
          //   translateY: props.translateY.to({
          //     range: [0, 1],
          //     output: ["-50vh", "0vh"],
          //   }),
        }}
      >
        {showContact && (
          <Compose show={open} setShow={setOpen} phone={contactName.phone} />
        )}
        {browserName === "Chrome" && !isMobile ? (
          <Paper
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background:
                "linear-gradient(to right bottom,hsl(240, 67%, 94%,0.5),hsl(340, 100%, 97%,0.5))",
              backdropFilter: "blur(1rem)",
              // height: "50vh",
            }}
          >
            <PaperContent />
          </Paper>
        ) : (
          <Paper
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background:
                "linear-gradient(to right bottom,hsl(240, 67%, 94%,0.5),hsl(340, 100%, 97%,0.5))",
              WebkitBackdropFilter: "blur(1rem)",
              // height: "50vh",
            }}
          >
            <PaperContent />
          </Paper>
        )}
      </animated.div>
      <animated.div
        style={{
          width: windowDimensions.width <= 950 ? "50vh" : "50vw",
          height: windowDimensions.width <= 950 ? "50vh" : "50vw",
          // background: "hsl(16, 100%, 66%,.8)",
          background: "linear-gradient(to right top,crimson,aliceblue)",
          //   opacity: anim.to({ range: [0, 1], output: [0, 1] }),
          borderRadius: windowDimensions.width <= 950 ? "50vh" : "50vw",
          position: "fixed",
          top: windowDimensions.width <= 750 ? "-15%" : "-35%",
          left: windowDimensions.width <= 750 ? "-45%" : "-10%",
          //   scale: props.c1,
          zIndex: 1,
        }}
      />
      <animated.div
        style={{
          width: windowDimensions.width <= 950 ? "10vh" : "5vw",
          height: windowDimensions.width <= 950 ? "10vh" : "5vw",
          // background: "hsl(16, 100%, 66%,.8)",
          background: "linear-gradient(to left bottom,purple,oldlace)",
          //   opacity: anim.to({ range: [0, 1], output: [0, 1] }),
          borderRadius: windowDimensions.width <= 950 ? "50vh" : "50vw",
          position: "fixed",
          top: windowDimensions.width <= 750 ? "23%" : "15%",
          right: windowDimensions.width <= 750 ? "-5%" : "18%",
          //   scale: props.c2,
          zIndex: 1,
        }}
      />
      <animated.div
        style={{
          width: windowDimensions.width <= 950 ? "30vh" : "35vw",
          height: windowDimensions.width <= 950 ? "30vh" : "35vw",
          // background: "hsl(16, 100%, 66%,.8)",
          background: "linear-gradient(to right top,darkblue,beige)",
          //   opacity: anim.to({ range: [0, 1], output: [0, 1] }),
          borderRadius: windowDimensions.width <= 950 ? "50vh" : "50vw",
          position: "fixed",
          bottom: windowDimensions.width <= 750 ? "15%" : "-30%",
          right: windowDimensions.width <= 750 ? "-10%" : "-5%",
          //   scale: props.c3,
          zIndex: 1,
        }}
      />
    </div>
  );
}
