import React from 'react';
import { forwardRef, useState } from 'react';

export default function DropDown({ label, name, onChange, value }) {
    // const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelctedValue] = useState(value);

    function handleSelect(event) {
        const val = event.target.value;
        setSelctedValue(val);
        onChange(name, val);
        // setIsOpen(false);
    }

    let options = [];

    if (label === 'Gender') {
        options = ['Male', 'Female', 'Other'];
    } else if (label === 'Race') {
        options = ['Asian/Pacific Islander', 'White', 'Black', 'Hispanic/Latinx', 'Native American']
    } else if (label === 'Desired College') {
        options = ['Enter']
    } else if (label === 'Desired Field') {
        options = ['STEM', 'Pre-Med', 'Social Sciences', 'Arts', 'Business/Econ', 'Humanities']
    } else if (label === 'First-Gen Status') {
        options = ['Yes', 'No']
    }

    return (
        <div className="w-1/2 p-2 flex">
            <label className="mr-3">{label}</label>
            <span className="flex flex-grow justify-end">
                <select value={selectedValue} onChange={handleSelect} className="w-[16rem] justify-end"> 
                    <option value="" disabled></option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </span>
        </div>
    );
};

