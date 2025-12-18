import React from 'react';
import { useState } from 'react';

import LandingPage from "./pages/LandingPage";
import ResultsPage from './pages/ResultsPage';
// import "./App.css";
 
export default function App() {
    const [studentData, setStudentData] = useState({});
    const [recResultData, setRecResultData] = useState({});

    function handleGenerate(studentData, recData) {
      setStudentData(studentData);
      setRecResultData(recData)
    }
 
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LandingPage onGenerate={handleGenerate} />}
          />
          <Route path="/results" element={<ResultsPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    );
}