import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const InterviewReview = () => {

    const { id } = useParams()

    const [interview, setInterview] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchInterview = async () => {

        try {
            const response = await api.get(`/interview/${id}`)

            setInterview(response.data.interview)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
        fetchInterview()
    }, [])


    if (loading) {
        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-200 p-8">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold">
                    Interview Review
                </h1>

                <p className="mt-2 text-base-content/70">
                    {interview.jobRole} • {interview.interviewType} • {interview.difficulty}
                </p>

                <div className="divider"></div>
                {
                    interview.questions.map((question) => {
                        const score = question.score ?? 0;

                        let badge = "badge-error"
                        let label = "Needs Improvement"

                        if (score >= 8) {
                            badge = "badge-success"
                            label = "Excellent"
                        } else if (score >= 5) {
                            badge = "badge-warning"
                            label = "Good"
                        }

                        return (
                            <div key={question.order}  className="card bg-base-100 shadow-lg mb-8">
                                <div className="card-body">
                                    <div className="flex justify-between items-center">

                                        <h2 className="card-title">
                                            Question {question.order}
                                        </h2>
                                        <span className={`badge ${badge}`}>
                                            {label}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="font-bold">
                                            Question
                                        </h3>
                                        <p>
                                            {question.question}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="font-bold">
                                            Your Answer
                                        </h3>
                                        <p>
                                            {question.answer || "-"}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="font-bold">
                                            Expected Answer
                                        </h3>
                                        <p>
                                            {question.aiExpectedAnswer || "-"}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="font-bold">
                                            AI Feedback
                                        </h3>
                                        <p>
                                            {question.feedback || "-"}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center mt-6">
                                        <div>
                                            <span className="font-bold">
                                                Score :
                                            </span>{" "}
                                            {question.score ?? "-"}/10
                                        </div>

                                        <div>
                                            <span className="font-bold">
                                                Time :
                                            </span>{" "}
                                            {question.answerDuration ?? 0} sec
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default InterviewReview;