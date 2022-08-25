import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./elements/todo/Todo";
import TwilioSms from "./elements/twiliosms/TwilioSms";
import SendMessages from "./elements/twiliosms/SendMessages";
import DragDrop from './elements/upload/DragDrop'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/twiliosms" element={<TwilioSms />} />
          <Route path="/sendmessages" element={<SendMessages />} />÷
          <Route path="/todo" element={<Main />} />
          <Route path="/upload" element={<DragDrop />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
