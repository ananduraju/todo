import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./elements/todo/Todo";
import TwilioSms from "./elements/twiliosms/TwilioSms";
import SendMessages from "./elements/twiliosms/SendMessages";
import DragDrop from "./elements/upload/DragDrop";
import Alarm from "./elements/alarm/Alarm";
import Hotel from "./elements/hotel/Hotel";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/twiliosms" element={<TwilioSms />} />
          <Route path="/sendmessages" element={<SendMessages />} />÷
          <Route path="/todo" element={<Main />} />
          <Route path="/upload" element={<DragDrop />} />
          <Route path="/hotel" element={<Hotel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
