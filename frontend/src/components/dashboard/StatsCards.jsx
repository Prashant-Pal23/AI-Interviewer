const StatsCards = ({ dashboardData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

            <div className="card bg-base-100 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                <div className="card-body items-center text-center p-6">

                    <div className="text-3xl">📄</div>

                    <h2 className="card-title text-lg mt-2">Resume</h2>

                    <p className="text-2xl font-bold text-primary">
                        {dashboardData?.resumeUploaded ? "Yes" : "No"}
                    </p>

                    <p className="text-sm text-base-content/70">Uploaded</p>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                <div className="card-body items-center text-center">
                    <div className="text-3xl">🎯</div>
                    <h2 className="card-title text-lg mt-2"> ATS Score </h2>

                    <p className="text-2xl font-bold text-success">
                        {dashboardData?.latestATSScore ?? "--"}
                    </p>
                    <p className="text-sm text-base-content/70"> Latest Analysis</p>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                <div className="card-body items-center text-center">
                    <div className="text-3xl">🎤</div>
                    <h2 className="card-title text-lg mt-2"> Interviews </h2>

                    <p className="text-2xl font-bold text-secondary">
                        {dashboardData?.completedInterviews ?? 0}
                    </p>
                    <p className="text-sm text-base-content/70"> Completed </p>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                <div className="card-body items-center text-center">
                    <div className="text-3xl">⭐</div>
                    <h2 className="card-title text-lg mt-2"> Average Score </h2>

                    <p className="text-2xl font-bold text-warning">
                        {dashboardData?.averageScore ?? 0}%
                    </p>

                    <p className="text-sm text-base-content/70">Overall Performance </p>
                </div>
            </div>
        </div>
    )
}

export default StatsCards;