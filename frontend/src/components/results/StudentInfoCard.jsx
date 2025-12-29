import React from "react";
import { GraduationCap, Target, TrendingUp } from "lucide-react";

export default function StudentInfoCard({ student, formData, onViewDetails }) {
  return (
    <div className="mb-8 bg-amber-50/70 rounded-xl shadow px-6 py-8 relative group overflow-visible">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Student</p>
            <p className="font-medium">{student.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <Target className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Target College</p>
            <p className="font-medium">{formData.desiredCollege || "Not specified"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Field</p>
            <p className="font-medium capitalize">{formData.desiredField || "General"}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-500">Current Level</p>
            <p className="font-medium">{student.level}</p>
          </div>
        </div>
      </div>
        
      {/* hover for details */}
      <div className="absolute bottom-3 right-8">
        <button
            onClick={onViewDetails}
            className="text-teal-600 text-sm hover:underline"
        >
            View Details →
        </button>
      </div>
    </div>
  );
}
