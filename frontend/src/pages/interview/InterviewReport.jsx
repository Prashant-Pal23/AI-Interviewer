import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

import ReportSummary from "../../components/interview/ReportSummary";
import ReportSection from "../../components/interview/ReportSection";

const InterviewReport = () => {

    const { id } = useParams()

    const [interview, setInterview] = useState(null)

    useEffect(() => {
        const fetchReport = async () => {
        const response = await api.get(`/interview/${id}`)
        setInterview(response.data.interview)

    }
     fetchReport()

    }, [])


    if (!interview)
        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        )

    return (
        <div className="min-h-screen bg-base-200 p-8">
            <div className="max-w-5xl mx-auto space-y-6">

                <h1 className="text-3xl font-bold">
                    Interview Report
                </h1>

                <ReportSummary interview={interview} />

                <div className="card bg-base-100 shadow">
                    <div className="card-body">

                        <h2 className="card-title">
                            Overall Feedback
                        </h2>

                        <p>
                            {interview.overallFeedback}
                        </p>
                    </div>
                </div>

                <ReportSection title="Strengths" items={interview.strengths} />

                <ReportSection title="Weaknesses"  items={interview.weaknesses} />

                <ReportSection title="Suggestions" items={interview.suggestions} />
            </div>
        </div>
    )
}

export default InterviewReport;