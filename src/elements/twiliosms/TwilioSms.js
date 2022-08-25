import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSpring, animated, easings } from "react-spring";
import getWindowDimensions from "../../custom/windowDimensions";
import { browserName, isMobile } from "react-device-detect";
import { url } from "../../custom/data";
import ShowMsgs from "./ShowMsgs";

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

export default function TwilioSms() {
  const [showMsgs, setShowMsgs] = useState(false);
  const [message, setMessage] = useState(false);
  const [anim, setAnim] = useState(false);
  const [anim2, setAnim2] = useState(false);
  const [anim3, setAnim3] = useState(false);
  const [animC1, setAnimC1] = useState(false);
  const [animC2, setAnimC2] = useState(false);
  const [animC3, setAnimC3] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  let navigate = useNavigate();

  const props = useSpring({
    scale: anim ? 1 : 0,
    scale2: anim2 ? 1 : 0,
    scale3: anim3 ? 1 : 0,
    c1: animC1 ? 1 : 0,
    c2: animC2 ? 1 : 0,
    c3: animC3 ? 1 : 0,
    translateY: anim ? 1 : 0,
    opacity: anim ? 1 : 0,
    background: anim ? "red" : "green",
    config: { duration: 1000, easing: easings.easeInOutQuint },
  });

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
  };

  const viewMsgs = () => {
    fetch(`${url}/viewMsgs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMessage(data.msg);
        setShowMsgs(true);
      });
  };

  useEffect(() => {
    setAnim(true);
    setTimeout(() => {
      setAnim2(true);
      setTimeout(() => {
        setAnim3(true);
      }, 80);
      setTimeout(() => {
        setAnimC1(true);
      }, Math.floor(Math.random() * 800));
      setTimeout(() => {
        setAnimC2(true);
      }, Math.floor(Math.random() * 800));
      setTimeout(() => {
        setAnimC3(true);
      }, Math.floor(Math.random() * 800));
    }, 200);
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
          {showMsgs && (
            <ShowMsgs show={showMsgs} setShow={setShowMsgs} msg={message} />
          )}
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
            {/* <br /> {windowDimensions.width / 210} */}
          </Typography>
        </animated.div>
        <div
          style={{
            // background: "red",
            margin: "15%",
            width: windowDimensions.width <= 950 ? "100%" : "60%",
            height: windowDimensions.width <= 500 ? "18vw" : "6vh",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <animated.div
            style={{
              scale: props.scale2.to({
                range: [0, 0.6, 1],
                output:
                  windowDimensions.width <= 500 ? [0, 1.2, 0.9] : [0, 1.2, 1],
              }),
            }}
          >
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                color="primary"
                style={{
                  height: "100%",
                }}
                onClick={() => {
                  setAnim2(false);
                  setAnim3(false);
                  setTimeout(() => {
                    navigate("/sendmessages");
                  }, 1000);
                }}
              >
                Send messages
              </Button>
            </ThemeProvider>
          </animated.div>
          <animated.div
            style={{
              scale: props.scale3.to({
                range: [0, 0.6, 1],
                output:
                  windowDimensions.width <= 500 ? [0, 1.2, 0.9] : [0, 1.2, 1],
              }),
            }}
          >
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                color="primary"
                style={{
                  height: "100%",
                }}
                onClick={viewMsgs}
              >
                View messages sent
              </Button>
            </ThemeProvider>
          </animated.div>
        </div>
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
          scale: props.scale,
          opacity: props.opacity,
          translateY: props.translateY.to({
            range: [0, 1],
            output: ["-50vh", "0vh"],
          }),
        }}
      >
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
          scale: props.c1,
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
          scale: props.c2,
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
          scale: props.c3,
          zIndex: 1,
        }}
      />
    </div>
  );
}
