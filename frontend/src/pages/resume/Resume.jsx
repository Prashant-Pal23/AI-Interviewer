import { useEffect, useState } from "react";
import api from "../../services/api";

import ResumeUploadCard from "../../components/resume/ResumeUploadCard.jsx";
import UploadedResumeCard from "../../components/resume/UploadResumeCard.jsx";

const Resume = () => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadedResume, setUploadedResume] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await api.get("/resume");
                setUploadedResume(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchResume()
    }, [])

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3000)

            return () => clearTimeout(timer);
        }
    }, [toast])

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setToast({
                message: "Please select a PDF",
                type: "error",
            })
            return
        }

        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("resume", selectedFile)
            const response = await api.post("/resume/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            
            setUploadedResume(response.data.data)
            setSelectedFile(null)
            setToast({
                message: "Resume Uploaded Successfully",
                type: "success",
            })
        } catch (error) {
            setToast({
                message:
                    error.response?.data?.message ||
                    "Upload Failed",
                type: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleReplaceResume = () => {
        setUploadedResume(null);
        setSelectedFile(null);
    }
    return (
        <div className="bg-base-200 min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                {
                    uploadedResume ? (
                        <UploadedResumeCard
                            uploadedResume={uploadedResume}
                            onReplace={handleReplaceResume}
                        />
                    ) : (
                        <ResumeUploadCard
                            selectedFile={selectedFile}
                            loading={loading}
                            onFileChange={handleFileChange}
                            onUpload={handleUpload}
                        />
                    )
                }
            </div>
            {
                toast && (
                    <div className="toast toast-end">
                        <div
                            className={`alert ${toast.type === "success"
                                    ? "alert-success"
                                    : "alert-error"
                                }`}
                        >
                            <span>{toast.message}</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Resume;