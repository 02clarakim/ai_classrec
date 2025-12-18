import { useState } from 'react';

export default function DropDown({ label, name, onChange, value }) {
    const [selectedValue, setSelctedValue] = useState(value);

    function handleSelect(event) {
        const val = event.target.value;
        setSelctedValue(val);
        onChange(name, val);
    }

    let options = [];

    if (label === 'Gender') {
        options = ['Male', 'Female', 'Other'];
    } else if (label === 'Race') {
        options = ['Asian/Pacific Islander', 'White', 'Black', 'Hispanic/Latinx', 'Native American']
    } else if (label === 'Desired College') {
        options = ['Enter']
    } else if (label === 'Desired Field') {
        options = ['STEM', 'Pre-Med', 'Social Sciences', 'Arts/Humanities', 'Business/Econ', 'Pre-Law']
    } else if (label === 'First-Gen Status') {
        options = ['Yes', 'No']
    }

    return (
        <div className="flex items-center gap-4">
            <label className="w-32 text-right text-sm font-medium">{label}</label>
            <span className="flex flex-grow justify-end">
                <select 
                    value={selectedValue} 
                    onChange={handleSelect} 
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 
                                bg-white text-sm
                                focus:outline-none focus:ring-1 focus:ring-teal-400"
                > 
                    <option value="" disabled>
                        Select {label.toLowerCase()}
                    </option>
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

