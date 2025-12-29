import React, { useState } from "react";
import { StudentDB } from "@/data/students";
import StudentCard from "@/components/StudentCard";
import AuthModal from "@/components/AuthModal";
import StudentDetailModal from "@/components/StudentDetailModal";
import LandingForm from "@/components/landing/LandingForm";
import campusBg from "@/assets/yonsei-wallp.jpg";

export default function LandingPage() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailStudent, setDetailStudent] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleViewDetails = (student) => {
    setDetailStudent(student);
    if (isAuthenticated) {
      setShowDetailModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setShowDetailModal(true);
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

      {/* Content */}
      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8 mt-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4">
              AI Class Recommendation
            </h1>
            <p className="text-foreground text-lg max-w-2xl mx-auto">
              Select a student to auto-fill their ID, or enter manually
            </p>
          </header>

          {/* Student Cards */}
          <section className="mb-4">
            {/* <h2 className="font-display text-2xl font-semibold mb-6 text-center">
              Available Students
            </h2> */}
            <div className="relative">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent pb-4">
                <div className="flex gap-3 px-2 py-2">
                  {StudentDB.map((student, index) => (
                    <div key={student.sid} style={{ animationDelay: `${index * 50}ms` }}>
                      <StudentCard
                        student={student}
                        onSelect={() => handleStudentSelect(student)}
                        onViewDetails={() => handleViewDetails(student)}
                        isSelected={selectedStudent?.sid === student.sid}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />
            </div>
          </section>

          <section>
            <LandingForm selectedStudent={selectedStudent} />
          </section>
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
