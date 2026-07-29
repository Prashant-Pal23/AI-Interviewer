const ATSResultCard = ({ analysisResult }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h1 className="text-3xl font-bold">
                    ATS Analysis Result
                </h1>

                <div className="divider"></div>
                
                <div className="stats shadow">
                    <div className="stat">

                        <div className="stat-title">
                            ATS Score
                        </div>

                        <div className="stat-value text-primary">
                            {analysisResult.score}%
                        </div>

                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="font-bold text-xl">
                        Strengths
                    </h2>

                    <ul className="list-disc ml-6 mt-2">
                        {
                            analysisResult.strengths.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="mt-8">
                    <h2 className="font-bold text-xl">
                        Weaknesses
                    </h2>

                    <ul className="list-disc ml-6 mt-2">
                        {
                            analysisResult.weaknesses.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="mt-8">
                    <h2 className="font-bold text-xl">
                        Missing Skills
                    </h2>

                    <ul className="list-disc ml-6 mt-2">
                        {
                            analysisResult.missingSkills.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="mt-8">
                    <h2 className="font-bold text-xl">
                        Suggestions
                    </h2>
                    <ul className="list-disc ml-6 mt-2">
                        {
                            analysisResult.suggestions.map((item, index) => (
                                <li key={index}>
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ATSResultCard;