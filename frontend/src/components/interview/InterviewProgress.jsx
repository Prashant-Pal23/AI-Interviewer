const InterviewProgress = ({ currentQuestion, totalQuestions }) => {

    return (
        <div className="mb-6">

            <progress
                className="progress progress-primary w-full"
                value={currentQuestion}
                max={totalQuestions}
            />

            <p className="text-center mt-2 font-medium">
                Question {currentQuestion} of {totalQuestions}
            </p>

        </div>
    );
};

export default InterviewProgress;