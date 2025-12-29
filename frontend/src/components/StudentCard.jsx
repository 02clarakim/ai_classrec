import React from "react";
import { Hash } from "lucide-react";

export default function StudentCard({ student, onSelect, onViewDetails, isSelected }) {
  const getLevelColor = (level) => {
    switch (level) {
      case "Freshman":
        return "bg-emerald-100 text-emerald-700";
      case "Sophomore":
        return "bg-blue-100 text-blue-700";
      case "Junior":
        return "bg-amber-100 text-amber-700";
      case "Senior":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in bg-amber-50/70 border-2 w-[200px] flex-shrink-0 rounded-lg p-4 ${
        isSelected ? "border-teal-500 shadow-lg" : "border-gray-300"
      }`}
    >
      <div className="mb-3">
        <h3 className="text-base font-semibold truncate">{student.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${getLevelColor(student.level)}`}>
          {student.level}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        <Hash className="w-3 h-3" />
        <span className="font-mono">{student.sid}</span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails();
        }}
        className="text-xs text-teal-600 font-medium hover:underline"
      >
        View details →
      </button>
    </div>
  );
}
