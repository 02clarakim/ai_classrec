import React from 'react';

export default function SingleOutput({ courseName, percent }) {
    let cssClass = 'h-[1rem] progress-box'
    // let percent = 90;

    if (percent >= 90) {
        cssClass += " bg-red-900 w-[15rem]"
    } else if (percent >= 80) {
        cssClass += " bg-red-800 w-[13.5rem]"
    } else if (percent >= 70) {
        cssClass += " bg-red-700 w-[12rem]"
    } else if (percent >= 60) {
        cssClass += " bg-red-600 w-[10.5rem]"
    } else if (percent >= 50) {
        cssClass += " bg-red-500 w-[9rem]"
    } else if (percent >= 40) {
        cssClass += " bg-red-400 w-[7.5rem]"
    } else if (percent >= 30) {
        cssClass += " bg-red-300 w-[6rem]"
    } else if (percent >= 20) {
        cssClass += " bg-red-200 w-[4.5rem]"
    } else if (percent >= 10) {
        cssClass += " bg-red-100 w-[3rem]"
    } else  {
        cssClass += " bg-stone-100 w-[1.5rem]"
    }

    let courseClass = "w-[9rem] text-sm leading-4";


    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center w-full h-[2.5rem]">
                <p className="w-[9rem] text-sm leading-4 pr-2">{courseName}</p>
                <div className="w-[16rem]">
                    <p className={cssClass}></p>
                </div>
                <p className="text-center pl-5 text-stone-400 fade-in ml-auto">{percent}</p>
            </div>
        </div>
    )
}