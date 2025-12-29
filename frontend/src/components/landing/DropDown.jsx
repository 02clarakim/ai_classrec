import { useState } from 'react';

export default function DropDown({ label, name, onChange, value }) {
    const [selectedValue, setSelectedValue] = useState(value || "");
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    function handleSelect(option) {
        setSelectedValue(option);
        setDropdownVisible(false);
        onChange(name, option);
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
            <div className="flex-1 relative">
                <input
                value={selectedValue}
                readOnly
                placeholder={`Select ${label.toLowerCase()}`}
                onFocus={() => setDropdownVisible(true)}
                onBlur={() => setTimeout(() => setDropdownVisible(false), 100)}
                className="w-full rounded-lg border text-sm border-gray-300 px-4 py-2 
                            bg-white cursor-pointer
                            focus:outline-none focus:ring-1 focus:ring-teal-400"
                />

                {isDropdownVisible && (
                <ul
                    className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto 
                            rounded-lg border border-gray-200 bg-white shadow-lg z-20"
                >
                    {options.map((option, i) => (
                    <li
                        key={i}
                        onMouseDown={() => handleSelect(option)}
                        className="px-4 py-2 cursor-pointer text-sm
                                hover:bg-teal-50 hover:text-teal-700"
                    >
                        {option}
                    </li>
                    ))}
                </ul>
                )}
            </div>
        </div>
    );
};

