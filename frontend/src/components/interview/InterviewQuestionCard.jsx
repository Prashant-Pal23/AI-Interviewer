import { useState } from "react";

const InterviewQuestionCard = ({ question, loading, onSubmit }) => {

    const [answer, setAnswer] = useState("");

    const handleSubmit = () => {

        if (!answer.trim()) return;

        onSubmit(answer);

        setAnswer("");

    };

    return (

        <div className="card bg-base-100 shadow-xl">

            <div className="card-body">

                <h2 className="text-xl font-bold">
                    {question.question}
                </h2>

                <textarea
                    className="textarea textarea-bordered h-40 mt-4"
                    placeholder="Write your answer..."
                    value={answer}
                    onChange={(e) =>
                        setAnswer(e.target.value)
                    }
                />

                <button
                    className="btn btn-primary mt-4"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Submitting..."
                            : "Next Question"
                    }
                </button>

            </div>

        </div>

    );
};

export default InterviewQuestionCard;