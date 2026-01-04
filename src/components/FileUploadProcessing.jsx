import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { extractLasuCourseApiPayload } from "../util/extractLasuCourseApiPayload";
import { CircleXIcon } from "lucide-react";
import { toast } from "react-toastify";

const FileUploadProcessing = ({
  academicInfo,
  onClose,
  setStudentCourse,
}) => {
  const academicData = [
    { label: "Faculty", value: `${academicInfo.faculty}` },
    { label: "Department", value: `${academicInfo.department}` },
    { label: "Level", value: `${academicInfo.inferred_current_level} Level` },
    {
      label: "Total Units",
      value: `${academicInfo.total_units_completed_ctnup} Units`,
    },
    { label: "Current CGPA", value: `${academicInfo.cgpa} / 5.0` },
  ];

  const [displayText, setDisplayText] = useState("")

  const [error, setError] = useState("");



  useEffect(() => {
    const fetchCourse = async (data) => {
      const formData = new URLSearchParams();

      formData.append("fac", data.facultyCode);
      formData.append("dept", data.departmentCode);
      formData.append("level", data.level);

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
          const formattedData = data.data
            .filter((d) => !d["COURSE CODE"]?.startsWith("ENT"))
            .map((d) => {
              return {
                course_code: d["COURSE CODE"],
                course_unit: d["UNIT"],
              };
            });
          setStudentCourse(formattedData);
          onClose();
        } else if (data.message === "Level Not Found") {
          toast.error(`No course found for the department and level chosen.`);
        } else {
          console.log(data);
          toast.error(`please enter your course and unit manually.`);
        }
      } catch (err) {
        toast.error(err);
      }
    };

    if (academicInfo.faculty) {
      try {
        setDisplayText("Validating academic data");
        const response = extractLasuCourseApiPayload(academicInfo);
        if (response) {
          setDisplayText("Getting your courses for this semester");
          fetchCourse(response);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  }, [academicInfo, onClose, setStudentCourse]);

  return (
    <div>
      {/* Main Processing Spinner */}
      <>
        {error ? (
          <div className="flex justify-center items-center mb-5">
            <CircleXIcon className="h-10 w-10 text-red-700" />
          </div>
        ) : (
          <div className="relative mb-6 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="h-16 w-16 rounded-full border-[3px] border-gray-100 border-t-blue-600"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute h-8 w-8 rounded-full bg-blue-50"
            />
          </div>
        )}
      </>

      <h2 className="mb-6 text-center text-lg font-bold tracking-tight text-gray-800">
        {error ? error : displayText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ...
        </motion.span>
      </h2>

      {error && (
        <button
          onClick={onClose}
          className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors mt-4"
        >
          Proceed
        </button>
      )}

      {!error && (
        <div className="w-full space-y-1">
          {academicData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              // No repeat on the container transition: it stays once it arrives
              transition={{
                delay: i * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="flex justify-between items-center px-3 py-2 rounded-lg bg-gray-50/80 border border-gray-100"
            >
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-500/80">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  {item.value}
                </span>
              </div>

              {/* Minimal pulsing dot to show background activity */}
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="h-1.5 w-1.5 rounded-full bg-blue-400"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadProcessing;
