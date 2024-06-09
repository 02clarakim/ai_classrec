// import { useEffect, useState } from 'react';

// import LandingPage from './components/LandingPage';
// import ResultsPage from './components/ResultsPage';

// function App() {
//   const [showResults, setShowResults] = useState(false);
//   const [studentData, setStudentData] = useState({});
  
// //   useEffect(() => {
// //     // Using fetch to fetch the api from 
// //     // flask server it will be redirected to proxy
// //     fetch("/data").then((res) =>
// //         res.json().then((data) => {
// //             // Setting a data from api
// //             setStudentData({
// //                 name: data.name,
// //                 level: data.level,
// //                 major: data.major,
// //                 tier: data.tier,
// //             });
// //         })
// //     );
// // }, []);
//   async function handleGenerate(data) {
//     const response = await fetch('/api/student-info', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     setStudentData(result);
//     setShowResults(true);
//   }

//   // function handleGenerate(data) {
//   //   setStudentData(data);
//   //   setShowResults(true);
//   // }

//   // function handleGenerate(data) {
//   //   setStudentData(data);
//   //   setShowResults(true);
//   // }

//   return (
//       <div className="App">
//         <header className="App-header">
//             <h1>React and flask</h1>
//             {/* Calling a data from setdata for showing */}
//             <p>{studentData.name}</p>
//             <p>{studentData.level}</p>
//             <p>{studentData.major}</p>
//             <p>{studentData.tier}</p>

//         </header>
//       </div>
//     // <>
//     //   {showResults ? (
//     //     <ResultsPage inputData={studentData}/>
//     //     // <ResultsPage name="John Doe" sID={studentID} level="Sophomore" tier="Tier I" major="Pre-Law"/>
//     //   ) : (
//     //     <p className="text-xl text-blue-700">{studentData.major}</p>
//     //     // <LandingPage onGenerate={handleGenerate}/>
//     //   )}
//     // </>
//   );
// }

// export default App;
// Filename - App.js
 
// Importing modules
import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

import LandingPage from "./components/landing/LandingPage";
import ResultsPage from './components/results/ResultsPage';
// import "./App.css";
 
function App() {
    const [showResults, setShowResults] = useState(false);
    const [studentData, setStudentData] = useState({});
    const [recResultData, setRecResultData] = useState({});

    function handleGenerate(studentData, recData) {
      setStudentData(studentData);
      setShowResults(true);
      setRecResultData(recData)
    }
 
    return (
      // <LandingPage onGenerate={handleGenerate}/>
      <>
        {showResults ? (
              <ResultsPage inputData={studentData} classRecArr={recResultData}/>
            ) : (
              <LandingPage onGenerate={handleGenerate}/>
            )}
      </>
    );
}
 
export default App;