import { useNavigate } from "react-router-dom";

const HistoryCard = ({ interview }) => {

    const navigate = useNavigate();

    return (
        <div className="card bg-base-100 shadow-md">

            <div className="card-body">

                <h2 className="card-title">
                    {interview.jobRole}
                </h2>

                <p>
                    <strong>Company:</strong>{" "}
                    {interview.company || "N/A"}
                </p>

                <p>
                    <strong>Difficulty:</strong>{" "}
                    {interview.difficulty}
                </p>

                <p>
                    <strong>Interview Type:</strong>{" "}
                    {interview.interviewType}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {interview.status}
                </p>

                <p>
                    <strong>Score:</strong>{" "}
                    {interview.overallScore ?? "-"}
                </p>

                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(interview.createdAt).toLocaleDateString()}
                </p>

                <div className="card-actions justify-end mt-4">

                    <button
                        className="btn btn-outline"
                        onClick={() =>
                            navigate(`/interview-review/${interview._id}`)
                        }
                    >
                        Review Questions
                    </button>
                    
                    {
                        interview.status === "Completed" ? (
                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    navigate(`/interview-report/${interview._id}`)
                                }
                            >
                                View Report
                            </button>
                        ) : (
                            <button
                                className="btn btn-secondary"
                                onClick={() =>
                                    navigate(`/interview/${interview._id}`)
                                }
                            >
                                Continue Interview
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default HistoryCard;