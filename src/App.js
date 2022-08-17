import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./elements/todo/Todo";
import TwilioSms from "./elements/twiliosms/TwilioSms";
import SendMessages from "./elements/twiliosms/SendMessages";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TwilioSms />} />
          <Route path="/sendmessages" element={<SendMessages />} />÷
          {/* <Route path="/" element={<Main />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
