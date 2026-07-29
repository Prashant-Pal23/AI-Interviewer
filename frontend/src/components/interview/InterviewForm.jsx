import { useState } from "react";
import QuestionCountSelector from "./QuestionCountSelector.jsx";

const InterviewForm = ({ onSubmit, loading }) => {

    const [formData, setFormData] = useState({
        jobRole: "",
        company: "",
        topic: "",
        difficulty: "Medium",
        interviewType: "Technical",
        totalQuestions: 10,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="card bg-base-100 shadow-xl">

            <div className="card-body">

                <h2 className="card-title text-2xl mb-4">
                    Create Interview
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="jobRole"
                        placeholder="Job Role"
                        className="input input-bordered w-full"
                        value={formData.jobRole}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="company"
                        placeholder="Company (Optional)"
                        className="input input-bordered w-full"
                        value={formData.company}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="topic"
                        placeholder="Topic"
                        className="input input-bordered w-full"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="difficulty"
                        className="select select-bordered w-full"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <select
                        name="interviewType"
                        className="select select-bordered w-full"
                        value={formData.interviewType}
                        onChange={handleChange}
                    >
                        <option>Technical</option>
                        <option>HR</option>
                        <option>Mixed</option>
                    </select>

                    <div>
                        <p className="font-semibold mb-2">
                            Total Questions
                        </p>

                        <QuestionCountSelector
                            value={formData.totalQuestions}
                            onChange={(count) =>
                                setFormData({
                                    ...formData,
                                    totalQuestions: count,
                                })
                            }
                        />
                    </div>

                    <button
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {
                            loading
                                ? "Generating..."
                                : "Start Interview"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
};

export default InterviewForm;
