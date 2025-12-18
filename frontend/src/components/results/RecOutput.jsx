import React from 'react';

import SingleOutput from "./SingleOutput";

// import MockRecs from "../../assets/MockCourseRecs";
import courseList from "../../assets/CourseList";

export default function RecOutput({ classRecArr, grade }) {
    classRecArr = classRecArr[0].slice(0, 61);
    const processedCourse = courseList.map((course, index) => [course[0], classRecArr[index] * 100]);

    const filteredRecs = processedCourse.filter(info => (info[1] >= 5));
    const sortedRecs = filteredRecs.sort((a,b) => b[1] - a[1]);

    let nextyr = ""
    if (grade == 'Freshman') {
        nextyr = 'Sophomore';
    } else if (grade == 'Sophomore') {
        nextyr = 'Junior';
    } else {
        nextyr = 'Senior';
    }

    return (
        <div className="rounded-xl bg-cyan-100 w-full p-4 outline outline-2 outline-stone-400">
            <div className="p-3">
                <h2 className="text-center text-xl">Showing Classes for</h2>
                <h2 className="font-bold text-center text-xl">{nextyr} Year</h2>
                <p className="text-right mr-5 text-stone-500">%</p>
                <section className="p-2.5">
                    {
                        // HERE IS WHERE I WANT TO USE THE JSONIFY OUTPUT AND USE IT TO DISPLAY ON PAGE
                        sortedRecs.map(([courseName, percent], index) => (
                            <SingleOutput key={index} courseName={courseName} percent={percent.toFixed(1)}/>
                        ))
                    }
                </section>
            </div>
        </div>
    )
}