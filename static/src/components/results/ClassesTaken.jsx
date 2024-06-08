import React from 'react';

import PrevClassData from "./PrevClassData";

export default function ClassesTaken({ studentInfo }) {
    const gradesList = studentInfo.prevClasses;

    return (
        <div className="bg-stone-200 rounded-xl w-3/4 p-3 mr-5 outline outline-2 outline-stone-400 ">
            <div className="p-3">
                <h1 className="text-center text-xl">Classes Taken</h1>
                <div className="pt-3">
                    {Object.entries(gradesList).map(([gradeLevel, courses]) => (
                        <div key={gradeLevel}>
                            <h2 className="mt-3 ml-2.5 bg-stone-100 p-1 w-1/3 rounded-xl text-center mb-2">{gradeLevel}</h2>
                            {courses.map(([courseName, gpa]) => (
                                <PrevClassData key={courseName} courseName={courseName} gpa={gpa.toFixed(1)} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}