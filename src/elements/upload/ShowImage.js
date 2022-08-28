import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@mui/material";
import { useSpring, animated, easings } from "react-spring";

export default function ShowImage({ image, name }) {
  const [nameWidth, setNameWidth] = useState(0);
  const [anim, setAnim] = useState(false);
  const [anim2, setAnim2] = useState(false);
  const [anim3, setAnim3] = useState(false);
  const imageRef = useRef(null);

  const props = useSpring({
    scale: anim ? 1.5 : 1,
    opacity2: anim2 ? 1 : 0,
    opacity3: anim3 ? 1 : 0,
    config: { duration: 400, easing: easings.easeInOutQuint },
  });

  useEffect(() => {
    setTimeout(() => {
      setNameWidth(imageRef.current.offsetWidth);
      setAnim3(true);
    }, 1000);
  }, [imageRef]);

  useEffect(() => {
    setAnim2(true);
  }, []);
  return (
    <animated.div
      onMouseEnter={() => setAnim(true)}
      onMouseLeave={() => setAnim(false)}
      style={{
        opacity: props.opacity2,
        scale: props.scale,
        margin: "12%",
        position: props.position,
        maxWidth: "30vw",
      }}
    >
      <div
        ref={imageRef}
        style={{
          maxHeight: "70vh",
          width: "100%",
          borderRadius: ".5rem",
          overflow: "clip",
        }}
      >
        <img
          src={image}
          style={{
            height: "auto",
            maxHeight: "70vh",
            maxWidth: "100%",
            zIndex: 2,
          }}
        />
      </div>
      {nameWidth ? (
        <animated.div
          style={{
            opacity: props.opacity3,
            maxWidth: nameWidth,
            background: "#333333",
            padding: "5%",
            maxHeight: "30%",
            overflowWrap: "break-word",
            transform: "translateY(-6%)",
            borderRadius: "0rem 0rem .5rem .5rem",
            zIndex: 1,
          }}
        >
          <Typography style={{ color: "#666666" }}>{name}</Typography>
        </animated.div>
      ) : null}
      {/* <LinearProgress variant="determinate" value={50} /> */}
    </animated.div>
  );
}
