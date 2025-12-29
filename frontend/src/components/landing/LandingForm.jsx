import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";
import AutoComplete from "./AutoComplete";
import { getStudentInfo } from "@/data/students";
import { generateRecommendation } from "@/api/generate";
import ErrorMsg from "../ErrorMsg";

export default function LandingForm({ selectedStudent }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef();

  const [formData, setFormData] = useState({
    studentID: "",
    gender: "",
    race: "",
    desiredCollege: "",
    desiredField: "",
    firstGenStatus: "",
    parentsIncome: "",
  });

  useEffect(() => {
    if (selectedStudent) {
      setFormData((prev) => ({
        ...prev,
        studentID: selectedStudent.sid.toString(),
      }));
    }
  }, [selectedStudent]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showError = (msg) => {
    setErrorMessage(msg);
    errorRef.current?.open();
  };

  const handleGenerate = async () => {
    const student = getStudentInfo(parseInt(formData.studentID));
    if (!student) {
      showError("Invalid Student ID");
      return;
    }

    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        showError("Please complete all fields");
        return;
      }
    }

    try {
      setIsLoading(true);

      let recommendation = await generateRecommendation(formData);

      if (!Array.isArray(recommendation)) {
        recommendation = [[0]];
      } else if (!Array.isArray(recommendation[0])) {
        recommendation = [recommendation];
      }

      navigate("/results", {
        state: {
          student,
          formData,
          recommendation,
        },
      });
    } catch (err) {
      console.error(err);
      showError("Failed to generate recommendation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="bg-amber-50/70 rounded-2xl shadow-lg p-8 w-full max-w-3xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student ID */}
          <div className="md:col-span-2 flex items-center gap-4">
            <label className="w-32 text-right text-sm font-medium">
              Student ID
            </label>
            <input
              type="text"
              value={formData.studentID}
              onChange={(e) => handleChange("studentID", e.target.value)}
              className="flex-1 text-sm rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-teal-400"
              placeholder="20239999"
            />
          </div>

          <DropDown label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
          <DropDown label="Race" name="race" value={formData.race} onChange={handleChange} />
          <AutoComplete label="Desired College" name="desiredCollege" value={formData.desiredCollege} onChange={handleChange} />
          <DropDown label="Desired Field" name="desiredField" value={formData.desiredField} onChange={handleChange} />
          <DropDown label="First-Gen Status" name="firstGenStatus" value={formData.firstGenStatus} onChange={handleChange} />

          {/* Income */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-right text-sm font-medium">Parents Income ($)</label>
            <input
              type="text"
              value={formData.parentsIncome}
              onChange={(e) => handleChange("parentsIncome", e.target.value.replace(/[^0-9]/g, ""))}
              onBlur={() => {
                if (!formData.parentsIncome) return;
                const rounded = Math.round(parseInt(formData.parentsIncome) / 1000) * 1000;
                handleChange("parentsIncome", rounded.toString());
              }}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-400"
              placeholder="50000"
            />
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-10 py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition disabled:opacity-60"
          >
            {isLoading ? "Generating..." : "Generate!"}
          </button>
        </div>
      </form>

      <ErrorMsg
        ref={errorRef}
        title="Form Error"
        message={errorMessage}
        buttonCaption="OK"
      />
    </>
  );
}
