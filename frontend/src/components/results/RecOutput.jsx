import React from "react";

export default function RecommendationGraph({ courses, getBarColor }) {
  return (
    <div className="bg-amber-50/70 rounded-xl shadow p-6 mb-8">
      <div className="max-h-[24rem] overflow-y-auto space-y-2">
        {courses.map((course, index) => (
          <div key={index} className="flex items-center gap-3">
            <p className="w-48 text-sm">{course.name}</p>
            <div className="h-4 flex-1 rounded bg-gray-200 overflow-hidden">
              <div
                className="h-4 progress-box"
                style={{
                  "--target-width": `${course.probability}%`,
                  backgroundColor: getBarColor(course.probability),
                }}
              />
            </div>
            <p className="w-12 text-right text-sm fade-in">{course.probability.toFixed(1)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
