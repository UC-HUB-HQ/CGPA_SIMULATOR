import { useState } from "react";
import { X, FileText, CheckCircle2, CloudUpload } from "lucide-react";
import { sleep } from "../util/sleep";
import FileUploadProcessing from "./FileUploadProcessing";
import { toast } from "react-toastify";


const FileUpload = ({
  setResult,
  onClose,
  setStudentCourse,
  displayStudentInfoForm,
}) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [academicData, setAcademicData] = useState({
    cgpa: 0,
    confidence: 0,
    department: "",
    faculty: "",
    inferred_current_level: "",
    total_units_completed_ctnup: 0,
  });

  const [isSuccessFulExtraction, setIsSuccessfulExtraction] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const runProgress = (start, end, speed = 300) => {
    let current = start;

    const interval = setInterval(() => {
      current += Math.random() * 4;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setUploadProgress(Math.floor(current));
    }, speed);

    return interval;
  };


  // const processFile = async (selectedFile) => {
  //   setFile(selectedFile);
  //   setStatus("uploading");
  //   setUploadProgress(0);

  //   const body = new FormData();
  //   body.append("file", selectedFile);

  //   let uploadInterval;
  //   let extractInterval;

  //   try {
  //     uploadInterval = runProgress(0, 50);

  //     const response = await fetch(`${backendUrl}/api/gemini`, {
  //       method: "POST",
  //       body,
  //     });

  //     clearInterval(uploadInterval);
  //     setUploadProgress(50);

  //     const dataRes = await response.json();

  //     if (!response.ok) {
  //       throw { phase: "upload", message: dataRes.message };
  //     }

  //     if (dataRes.message?.error) {
  //       throw { phase: "extract", message: dataRes.message.error };
  //     }

  //     setStatus("extracting");
  //     extractInterval = runProgress(50, 95);

  //     await sleep(800); 
  //     clearInterval(extractInterval);
  //     setUploadProgress(100);

  //     setIsSuccessfulExtraction(true);
  //     setAcademicData(dataRes.message);
  //     setResult(dataRes.message);
  //     setStatus("success");
  //   }
  //   catch (err) {
  //     clearInterval(uploadInterval);
  //     clearInterval(extractInterval);

  //     if (err.phase === "extract") {
  //       setUploadProgress(50);
  //     }

  //     setStatus("error");
  //     setError(String(err.message || err));
  //     // displayStudentInfoForm();
  //     // alert("Our model is currently unavailable. Please proceed manually.");
  //   }
  // };
  
  const waitForProgress = (target) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= target) {
            clearInterval(interval);
            resolve();
            return prev;
          }
          return prev;
        });
      }, 50);
    });
  };

  
  
  const processFile = async (selectedFile) => {
    setFile(selectedFile);
    setStatus("uploading");
    setUploadProgress(0);

    const body = new FormData();
    body.append("file", selectedFile);

    let uploadInterval;
    let extractInterval;

    try {
      uploadInterval = runProgress(0, 50);

      const response = await fetch(`${backendUrl}/api/gemini`, {
        method: "POST",
        body,
      });

      const dataRes = await response.json();

      console.log(dataRes)



      if (!response.ok) {
        await waitForProgress(20);
        throw new Error(dataRes.message);
      }

      clearInterval(uploadInterval);
      setUploadProgress(50);

      if (dataRes.message?.error) {
        setStatus("error");
        setError(dataRes.message?.error);
        return;
      }

      setStatus("extracting");
      extractInterval = runProgress(50, 95);

      await sleep(800);

      clearInterval(extractInterval);
      setUploadProgress(100);

      setIsSuccessfulExtraction(true);
      setAcademicData(dataRes.message);
      setResult(dataRes.message);
      setStatus("success");
    }
    catch (err) {
      clearInterval(uploadInterval);
      clearInterval(extractInterval);
      setStatus("error");
      displayStudentInfoForm();
      toast.error(error);
    }
  };




  const reset = () => {
    setFile(null);
    setUploadProgress(0);
    setStatus("idle");
  };

  if (isSuccessFulExtraction) {
    return (
      <FileUploadProcessing
        academicInfo={academicData}
        onClose={onClose}
        setStudentCourse={setStudentCourse}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Upload File</h2>
        <p className="text-slate-500 mt-2">
          Upload your academic transcript for analysis
        </p>
      </div>

      {/* Upload Zone */}
      {status === "idle" && (
        <div
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300 ease-in-out`}
        >
          <input
            type="file"
            name="upload"
            id="upload"
            className="hidden"
            onChange={(e) => processFile(e.target.files[0])}
          />
          <label htmlFor="upload" className="cursor-pointer">
            <div
              className={`p-4 rounded-full mb-4 transition-colors duration-300`}
            >
              <CloudUpload size={32} />
            </div>
            <p className="text-sm font-medium text-slate-700">
              Click to upload
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Maximum file size 5 MB
            </p>
          </label>
        </div>
      )}

      {/* Uploading / Success State */}
      {status !== "idle" && (
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
              <FileText size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-700 truncate">
                {file?.name}
              </p>
              <p className="text-xs text-slate-500">
                {((file?.size ?? 0) / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={reset}
              className="p-1 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X size={18} className="text-slate-400" />
            </button>
          </div>

          {status !== "error" && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>
                  {status === "success"
                    ? "Extraction Complete"
                    : uploadProgress <= 20
                    ? "Uploading..."
                    : "Extracting..."}
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ease-out ${
                    status === "success" ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-center justify-center text-green-600 text-sm font-medium animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={16} className="mr-2" />
              File uploaded successfully!
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center text-red-600 text-sm font-medium animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={16} className="mr-2" />
              {error}
            </div>
          )}

          {status !== "success" && (
            <button
              onClick={reset}
              className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors mt-4"
            >
              {status === "success" ? "Upload Another" : "Cancel Upload"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

