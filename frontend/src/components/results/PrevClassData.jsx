import React from 'react';

export default function PrevClassData({ courseName, gpa}) {
    return (
        <div className="flex flex-row pl-1.5 fade-in">
            <p className="mr-2 ml-5">{courseName}</p>
            <p className="text-stone-400">({gpa})</p>
        </div>
    )
}