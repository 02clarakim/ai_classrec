import React from "react";
import { User, BookOpen } from "lucide-react";

export default function StudentDetailModal({ open, onClose, student }) {
  if (!open || !student) return null;

  const getGradeColor = (grade) => {
    if (grade >= 4.0) return "bg-emerald-100 text-emerald-700";
    if (grade >= 3.7) return "bg-blue-100 text-blue-700";
    if (grade >= 3.3) return "bg-amber-100 text-amber-700";
    return "bg-rose-100 text-rose-700";
  };

  const calculateGPA = (classes) => {
    if (classes.length === 0) return 0;
    const total = classes.reduce((sum, [, grade]) => sum + grade, 0);
    return (total / classes.length).toFixed(2);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
            <User className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{student.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-1 text-sm bg-gray-200 rounded-full">{student.level}</span>
              <span className="text-sm font-mono text-gray-500">ID: {student.sid}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 pr-4">
          {Object.entries(student.prevClasses).map(([year, classes]) => (
            <div key={year} className="animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-600" />
                  {year} Year
                </h3>
                <span className="text-sm text-gray-500">
                  GPA: <span className="font-semibold">{calculateGPA(classes)}</span>
                </span>
              </div>

              <div className="grid gap-2">
                {classes.map(([className, grade], index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-sm font-medium">{className}</span>
                    <span
                      className={`text-sm px-2 py-0.5 rounded-full ${getGradeColor(grade)}`}
                    >
                      {grade.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
