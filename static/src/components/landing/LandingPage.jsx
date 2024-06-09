import React from 'react';
import { useState, useRef } from 'react';

import DropDown from './DropDown';
import AutoComplete from './AutoComplete';
import bgImage from '../../assets/yonsei-bg.jpg';
import ErrorMsg from '../ErrorMsg';
import { getStudentInfo  } from "../../assets/StudentDB";


export default function LandingPage({ onGenerate }) {
    const error = useRef();

    const [errorType, setErrorType] = useState('');

    const [formData, setFormData] = useState({
        studentID: '',
        gender: '',
        race: '',
        desiredCollege: '',
        desiredField: '',
        firstGenStatus: '',
        parentsIncome: ''
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    function handleSelectChange(name, value) {
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleGenerate() {
        if (!getStudentInfo(formData.studentID)) {
            setErrorType('invalidID');
            error.current.open();
            return;
        }

        for (const value of Object.values(formData)) {
            if (value === '') {
                setErrorType('incomplete');
                error.current.open();
                return;
            }
        }
        
        setErrorType('');
        try {
            const response = await fetch('http://127.0.0.1:5000/receiveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // formData = studentData, data = recommended array
            onGenerate(formData, data)
        } catch (error) {
            console.error('Error:', error);
            setErrorType('network');
            error.current.open();
        }
    }

    return (
        <>  
            <ErrorMsg ref={error} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-700 my-4">
                    {errorType === 'incomplete' ? 'Incomplete Input' : 
                     errorType === 'invalidID' ? 'Invalid Student ID' : 
                     'Network Error'}
                </h2>
                <p className="text-stone-600 mb-4">
                    {errorType === 'incomplete' ? 'Please make sure you provide a valid value for every input field.' : 
                     errorType === 'invalidID' ? 'Please enter a valid student ID.' : 
                     'There was a problem with the network. Please try again later.'}
                </p>
            </ErrorMsg>
            <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-opacity-10"
            style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5)), url(${bgImage})`}}
            >
                <h1 className="text-6xl mb-10 mt-10">AI Class Recommendation</h1>
                <section className="w-3/5 rounded-xl bg-stone-200 p-10 flex flex-col items-center">
                    <div className="p-2">
                        <span className="mx-5">Student ID</span>
                        <input
                            type="number"
                            className="pl-1"
                            name="studentID"
                            value={formData.studentID}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-wrap w-full">
                        <DropDown label="Gender" name="gender" value={formData.gender} onChange={handleSelectChange} />
                        <DropDown label="Race" name="race" value={formData.race} onChange={handleSelectChange} />
                        <AutoComplete label="Desired College" name="desiredCollege" value={formData.desiredCollege} onChange={handleSelectChange} />
                        <DropDown label="Desired Field" name="desiredField" value={formData.desiredField} onChange={handleSelectChange} />
                        <DropDown label="First-Gen Status" name="firstGenStatus" value={formData.firstGenStatus} onChange={handleSelectChange} />
                        <div className="relative w-1/2 p-2 flex">
                            <span className="mr-3">Parents Income ($)</span> 
                            <input
                                className="ml-auto w-[16rem] pl-1"
                                type="number"
                                name="parentsIncome"
                                value={formData.parentsIncome}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button onClick={handleGenerate} className="px-4 py-2 text-xs md:text-base rounded-md bg-teal-200 text-black hover:bg-teal-400 hover:text-stone-100 mt-5">Generate!</button>
                </section>
            </div>
        </>
        
    );
}
