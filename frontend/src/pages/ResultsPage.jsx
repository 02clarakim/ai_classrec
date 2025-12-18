import React from 'react';

// import ClassesTaken from "./ClassesTaken";
// import RecOutput from "./RecOutput";
import bgImage from '../assets/yonsei-wallp.jpg';
import { getStudentInfo  } from "../data/students";

export default function ResultsPage({ inputData, classRecArr }) {    
    const inputID = inputData.studentID;
    const inputCollege = inputData.desiredCollege;
    const inputField = inputData.desiredField;

    const studentInfoAll = getStudentInfo(inputID);
    const studentName = studentInfoAll.name;
    const studentLevel = studentInfoAll.level;

    return (
        <div className="flex flex-col justify-center items-center bg-cover bg-center bg-opacity-10"
            style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5)), url(${bgImage})`}}
        >
            <h2 className="text-6xl mb-10 mt-32">Recommended Classes</h2>
            <div className="w-1/2 flex flex-row">
                <h2 className="text-center flex justify-start w-1/2 font-semibold text-teal-800">{studentName} ({inputID}), {studentLevel}</h2>
                <h2 className="text-center flex justify-end w-1/2 font-semibold text-teal-800">Desired College: {inputCollege}, {inputField}</h2>
            </div>
            <div className="w-2/3 p-10 flex flex-row items-start justify-between">
                <ClassesTaken studentInfo={studentInfoAll}/>
                <RecOutput classRecArr={classRecArr} grade={studentLevel}/>
            </div>
            
        </div>
        
    )
}