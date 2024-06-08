import React from 'react';
import { forwardRef, useState } from 'react';

import options from '../../assets/CollegeOptions';

export default function AutoComplete({ label, name, onChange, value }) {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedCollege, setSelectedCollege] = useState(false);

    function handleInputChange(event) {
        const value = event.target.value;
        setInputValue(value);
        setSelectedCollege(false);

        // Filter options based on input value
        const filtered = options.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
        setDropdownVisible(value !== '');
        // console.log(isDropdownVisible);
    };

    function handleOptionSelect(option) {
        setInputValue(option);
        setDropdownVisible(false);
        setSelectedCollege(true);
        onChange(name, option);
        // console.log('SELECT')
    };

    function handleBlur() {
        if (!filteredOptions.includes(inputValue) && !selectedCollege) {
            setInputValue('');
            setDropdownVisible(false);
        }
        // console.log(filteredOptions)s
    }

    return (
        <div className="relative w-1/2 p-2 flex">
            <label className="mr-3">{label}</label>
            <span className="flex flex-grow justify-end">
                <input
                    type="text"
                    placeholder={'Type...'}
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-[16rem] flex-end pl-1"
                    // onFocus={() => setDropdownVisible(true)}
                    onBlur={handleBlur}
                />
                {isDropdownVisible && filteredOptions.length > 0 && (
                <ul className="absolute w-[16rem] shadow-xl rounded mt-6 bg-white mt-1 max-h-40 overflow-auto z-10">
                    {filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            onMouseDown={() => handleOptionSelect(option)}
                            className="cursor-pointer hover:bg-gray-200"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
                )}
            </span>
            
        </div>
    );
};

