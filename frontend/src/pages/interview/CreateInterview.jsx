import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import InterviewForm from "../../components/interview/InterviewForm";

const CreateInterview = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const handleCreateInterview = async (formData) => {
        try {
            setLoading(true);

            const resumeResponse = await api.get("/resume")
            
            const resume = resumeResponse.data.data

            const interviewResponse = await api.post("/interview", {
                resume: resume._id,
                ...formData,
            })

            navigate( `/interview/${interviewResponse.data.interview._id}` )
        } catch (error) {
            if ( error.config?.url === "/resume" && error.response?.status === 404) {
                alert("Please upload your resume first.");
                return
            }

            alert( error.response?.data?.message || "Failed to create interview.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-base-200 p-8">
            <div className="max-w-2xl mx-auto">
                <InterviewForm onSubmit={handleCreateInterview} loading={loading} />
            </div>
        </div>
    )
}

export default CreateInterview;