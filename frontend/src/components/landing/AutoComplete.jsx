import { useState } from 'react';
import { Colleges as collegeOptions } from "@/data/collegeOptions";

export default function AutoComplete({ label, name, onChange }) {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(collegeOptions);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    function handleInputChange(event) {
        const value = event.target.value;
        setInputValue(value);

        // filter options based on input value
        const filtered = collegeOptions.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredOptions(filtered);
        setDropdownVisible(value !== '');
        onChange(name, value);
        // console.log(isDropdownVisible);
    };

    function handleOptionSelect(option) {
        setInputValue(option);
        setDropdownVisible(false);
        onChange(name, option);
        // console.log('SELECT')
    };

    return (
        <div className="flex items-center gap-4 relative">
        {/* Label */}
        <label className="w-32 text-right text-sm font-medium">
            {label}
        </label>

        {/* Input + dropdown */}
        <div className="flex-1 relative">
            <input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Start typing..."
            className="w-full rounded-lg border text-sm border-gray-300 px-4 py-2 
                        focus:outline-none focus:ring-1 focus:ring-teal-400"
            onFocus={() => inputValue && setDropdownVisible(true)}
            onBlur={() => setTimeout(() => setDropdownVisible(false), 100)}
            />

            {isDropdownVisible && filteredOptions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto 
                            rounded-lg border border-gray-200 bg-white shadow-lg z-20">
                {filteredOptions.map((option, i) => (
                <li
                    key={i}
                    onMouseDown={() => handleOptionSelect(option)}
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

