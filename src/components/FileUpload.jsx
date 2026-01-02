import { useState } from "react";
import { X, FileText, CheckCircle2, CloudUpload } from "lucide-react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("idle");

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  console.log(backendUrl)

  const processFile = async (selectedFile) => {
    setFile(selectedFile);
    setStatus("uploading");

    const body = new FormData();

    body.append("file", selectedFile);

    // for (const [key, value] of body.entries()) {
    //     console.log(key, value);
    // }

    try {
      const response = await fetch(`${backendUrl}/api/gemini`, {
        method: "POST",
        body,
      });

      const dataRes = await response.json();
      console.log(dataRes);
    } catch (err) {
    } finally {
    }

    // Simulate upload progress
    // let progress = 0;
    // const interval = setInterval(() => {
    //   progress += 10;
    //   setUploadProgress(progress);
    //   if (progress >= 100) {
    //     clearInterval(interval);
    //     setStatus("success");
    //   }
    // }, 200);
  };

  const reset = () => {
    setFile(null);
    setUploadProgress(0);
    setStatus("idle");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300">
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
            <label htmlFor="upload">
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

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>
                  {status === "success" ? "Upload Complete" : "Uploading..."}
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

            {status === "success" && (
              <div className="flex items-center justify-center text-green-600 text-sm font-medium animate-in fade-in zoom-in duration-300">
                <CheckCircle2 size={16} className="mr-2" />
                File uploaded successfully!
              </div>
            )}

            <button
              onClick={reset}
              className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors mt-4"
            >
              {status === "success" ? "Upload Another" : "Cancel Upload"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;

// ${ isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50' }
