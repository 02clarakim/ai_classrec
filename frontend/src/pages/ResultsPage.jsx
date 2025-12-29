import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import StudentDetailModal from "../components/StudentDetailModal";
import AuthModal from "../components/AuthModal";
import { ArrowLeft, GraduationCap, Target, TrendingUp } from "lucide-react";
import { courseList } from "../data/courseList";
import campusBg from "@/assets/yonsei-wallp.jpg";

import StudentInfoCard from "../components/results/StudentInfoCard";
import RecOutput from "../components/results/RecOutput";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const { student, formData, recommendation } = location.state || {};

  const [detailStudent, setDetailStudent] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!student || !formData || !recommendation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 bg-white rounded-xl shadow text-center">
          <p className="text-gray-500 mb-4">
            No data found. Please go back and submit the form.
          </p>
          <Button onClick={() => navigate("/")} className="px-4 py-2 border rounded">
            <ArrowLeft className="w-4 h-4 inline-block mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleViewDetails = (clickedStudent) => {
    setDetailStudent(clickedStudent);
    if (isAuthenticated) setShowDetailModal(true);
    else setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setShowDetailModal(true);
  };

  const classRecArr = Array.isArray(recommendation) && recommendation.length > 0 ? recommendation[0] : [];
  
  const processedCourses = courseList.map((course, index) => ({
    name: course[0],
    probability: (classRecArr[index] || 0) * 100,
  }));

  const visibleCourses = processedCourses
    .filter((c) => c.probability > 0)
    .sort((a, b) => b.probability - a.probability);

  const getBarColor = (prob) => {
    if (prob >= 85) return "hsl(172, 66%, 50%)";
    if (prob >= 70) return "hsl(172, 50%, 60%)";
    return "hsl(172, 40%, 70%)";
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${campusBg})` }}
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => navigate("/")}
              className="px-3 py-2 rounded hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-semibold font-display">Recommended Courses</h1>
              <p className="text-gray-500">View next year's course recommendations for {student.name}</p>
            </div>
          </div>

        {/* Student Info Card */}
        <StudentInfoCard
            student={student}
            formData={formData}
            onViewDetails={() => handleViewDetails(student)}
          />

          {/* Recommendations Output */}
          <RecOutput
            courses={visibleCourses}
            getBarColor={getBarColor}
          />
        </div>
      </div>
      
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        studentName={detailStudent?.name || ""}
      />

      {detailStudent && (
        <StudentDetailModal
          open={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          student={detailStudent}
        />
      )}
    </div>
      
  );
}
