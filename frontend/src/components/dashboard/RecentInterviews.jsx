import { useNavigate } from "react-router-dom";

const RecentInterviews = ({ interviews }) => {
    const navigate = useNavigate()

    return (
        <div className="mt-10">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold"> Recent Interviews</h2>

                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate("/history")}
                >
                    View All
                </button>

            </div>

            <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Difficulty</th>
                            <th>Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {interviews.map((interview) => (
                            <tr key={interview._id}>
                                <td>{interview.jobRole}</td>
                                <td>{interview.difficulty}</td>
                                <td>{interview.overallScore ?? "--"}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            interview.status === "Completed"
                                                ? "badge-success"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {interview.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentInterviews;