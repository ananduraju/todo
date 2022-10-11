import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { AccessAlarm } from "@mui/icons-material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Alarm() {
  const [hrs, setHrs] = useState([]);
  const [mins, setMins] = useState([]);
  const [alarm, setAlarm] = useState({ hr: "01", min: "00", am_pm: "am" });
  const [alarm24Hrs, setAlarm24Hrs] = useState("01:00");
  const [time, setTime] = useState("");

  useEffect(() => {
    console.log(`time changed`, time);
    if (time === alarm24Hrs) {
      alert("alarm ringing....");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    let val;
    if (alarm.am_pm === "pm") {
      val = `${
        12 + parseInt(alarm.hr) === 24 ? "00" : 12 + parseInt(alarm.hr)
      }:${alarm.min}`;
    } else {
      val = `${alarm.hr}:${alarm.min}`;
    }
    console.log(`alarm changed`, val);
    setAlarm24Hrs(val);
  }, [alarm]);

  useEffect(() => {
    for (let i = 1; i <= 12; i++) {
      let val;
      if (i < 10) {
        val = `0${i}`;
      } else val = `${i}`;
      setHrs((p) => [...p, val]);
    }
    for (let i = 0; i <= 59; i++) {
      let val;
      if (i < 10) {
        val = `0${i}`;
      } else val = `${i}`;
      setMins((p) => [...p, val]);
    }
    setInterval(() => {
      const d = new Date();
      setTime(`${d.getHours()}:${d.getMinutes()}`);
    }, 60000);
    // console.log(hrs, mins);
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
      }}
    >
      <Typography
        sx={{ color: "black", fontFamily: "seriff", fontSize: "2rem" }}
      >
        Alarm Clock {`${alarm.hr}:${alarm.min}:${alarm.am_pm}`}
      </Typography>
      <AccessAlarm sx={{ fontSize: 100, color: "black", margin: "2%" }} />
      <Box
        sx={{
          minWidth: "25vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          //   background: "red",
        }}
      >
        <FormControl fullWidth style={{ margin: "2%" }}>
          <InputLabel id="demo-simple-select-label">Hours</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={alarm.hr}
            label="Hours"
            MenuProps={{
              style: {
                maxHeight: "30vh",
              },
            }}
            onChange={(e) => setAlarm((p) => ({ ...p, hr: e.target.value }))}
          >
            {hrs.map((hr, index) => (
              <MenuItem value={hr} key={index}>
                {hr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ margin: "2%" }}>
          <InputLabel id="demo-simple-select-label">Minutes</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={alarm.min}
            label="Minutes"
            MenuProps={{
              style: {
                maxHeight: "30vh",
              },
            }}
            onChange={(e) => setAlarm((p) => ({ ...p, min: e.target.value }))}
          >
            {mins.map((min, index) => (
              <MenuItem value={min} key={index}>
                {min}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ margin: "2%" }}>
          <InputLabel id="demo-simple-select-label">Am/Pm</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={alarm.am_pm}
            label="Am/Pm"
            MenuProps={{
              style: {
                maxHeight: "30vh",
              },
            }}
            onChange={(e) => setAlarm((p) => ({ ...p, am_pm: e.target.value }))}
          >
            <MenuItem value={"am"}>Am</MenuItem>
            <MenuItem value={"pm"}>Pm</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
