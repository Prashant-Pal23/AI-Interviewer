import { useState } from "react";

const ATSInputCard = ({ loading, onAnalyze}) => {
    const [jobDescription, setJobDescription] = useState("")
    const handleSubmit = () => {
        if (!jobDescription.trim()) return;

        onAnalyze(jobDescription);
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h1 className="text-3xl font-bold">
                    ATS Resume Analysis
                </h1>

                <p className="text-base-content/70">
                    Paste the job description below to analyze your resume.
                </p>
                <div className="divider"></div>
                <textarea
                    className="textarea textarea-bordered h-60"
                    placeholder="Paste Job Description..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />

                <div className="flex justify-end mt-6">
                    <button
                        className="btn btn-primary"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {
                            loading
                                ? "Analyzing..."
                                : "Analyze Resume"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ATSInputCard;