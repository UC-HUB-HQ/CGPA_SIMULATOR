import React, { useState } from "react";
import { faculties } from "../util/constant";

const MultiStepModal = ({ isOpen, onClose, setStudentCourse }) => {
  const [step, setStep] = useState(1);

  const [facultyCode, setFacultyCode] = useState("");

  const [departmentCode, setDepartmentCode] = useState("");

  const [level, setLevel] = useState("");

  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new URLSearchParams();

    formData.append("fac", facultyCode);
    formData.append("dept", departmentCode);
    formData.append("level", level);

    try {
        const response = await fetch(
            "https://lasu-course-api.onrender.com/get-courses",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
            }
        );

        const data = await response.json();
        if (data.message === "success") {
            const formattedData = data.data.map((d) => {
                return (
                    {
                        course_code: d["COURSE CODE"],
                        course_unit: d["UNIT"]
                    }
                )
            })
            setStudentCourse(formattedData);
            onClose();
        }
        else if(data.message === "Level Not Found"){
            alert(
              `No course found for the department and level chosen.`
            );
        }
        else {
            console.log(data);
            alert(
              `please enter your course and unit manually or try again later.`
            );
        }
    }
    catch (err) {
        alert(err);
    }
    finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  const currentFaculty = faculties[facultyCode];

  return (
    <div className="fixed inset-0 bg-black-100/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Step {step} of 3
        </h2>

        {/* Step 1: Faculty */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Select Faculty</label>
            <select
              value={facultyCode}
              onChange={(e) => setFacultyCode(e.target.value)}
              className="w-full border rounded-lg p-2 text-black-100"
            >
              <option value="">Choose Faculty </option>
              {Object.entries(faculties).map(([code, data]) => (
                <option key={code} value={code}>
                  {data.facultyName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 2: Department */}
        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Select Department
            </label>
            <select
              value={departmentCode}
              onChange={(e) => setDepartmentCode(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Choose Department</option>
              {currentFaculty &&
                Object.entries(currentFaculty.departments).map(
                  ([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  )
                )}
            </select>
          </div>
        )}

        {/* Step 3: Level */}
        {step === 3 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Select Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Choose Level</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
            </select>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !facultyCode) || (step === 2 && !departmentCode)
              }
              className={`px-4 py-2 rounded-lg ${
                (step === 1 && !facultyCode) || (step === 2 && !departmentCode)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!level}
              className={`px-4 py-2 rounded-lg ${
                !level
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepModal;
