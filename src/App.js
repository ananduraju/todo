import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./elements/Main";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
