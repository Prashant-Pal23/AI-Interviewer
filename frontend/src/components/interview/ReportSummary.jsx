const ReportSummary = ({ interview }) => {

    return (

        <div className="stats shadow w-full">

            <div className="stat">

                <div className="stat-title">
                    Overall Score
                </div>

                <div className="stat-value text-primary">
                    {interview.overallScore}
                </div>

            </div>

            <div className="stat">

                <div className="stat-title">
                    Questions
                </div>

                <div className="stat-value">
                    {interview.totalQuestions}
                </div>

            </div>

            <div className="stat">

                <div className="stat-title">
                    Duration
                </div>

                <div className="stat-value">
                    {interview.duration}s
                </div>

            </div>

        </div>

    );

};

export default ReportSummary;