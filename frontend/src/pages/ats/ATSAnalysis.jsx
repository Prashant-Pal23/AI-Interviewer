import { useState } from "react";
import api from "../../services/api";

import ATSInputCard from "../../components/ats/ATSInputCard";
import ATSResultCard from "../../components/ats/ATSResultCard";

const ATSAnalysis = () => {
    const [analysisResult, setAnalysisResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const handleAnalyze = async (jobDescription) => {
        try {
            setLoading(true)

            const response = await api.post("/resume/analyze", {
                jobDescription,
            })

            setAnalysisResult(response.data.data)
        } catch (error) {
            setToast({
                type: "error",
                message:
                    error.response?.data?.message ||
                    "Analysis Failed",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-base-200 min-h-screen p-8">
            <div className="max-w-5xl mx-auto">
                {
                    analysisResult ? (
                        <ATSResultCard
                            analysisResult={analysisResult}
                        />
                    ) : (
                        <ATSInputCard
                            loading={loading}
                            onAnalyze={handleAnalyze}
                        />
                    )
                }

            </div>
            {
                toast && (
                    <div className="toast toast-end">
                        <div className="alert alert-error">
                            <span>{toast.message}</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ATSAnalysis;