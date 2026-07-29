import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import InterviewProgress from "../../components/interview/InterviewProgress";
import InterviewQuestionCard from "../../components/interview/InterviewQuestionCard";

const Interview = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [interview, setInterview] = useState(null)

    const [currentIndex, setCurrentIndex] = useState(0)

    const [questionStartTime, setQuestionStartTime] = useState(() => Date.now())

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchInterview = async () => {
        const response = await api.get(`/interview/${id}`)
     
        const interview = response.data.interview

        setInterview(interview)
        
        const nextQuestionIndex = interview.questions.findIndex(
            (q) => !q.answer
        )

        setCurrentIndex(
            nextQuestionIndex === -1
                ? interview.questions.length - 1
                : nextQuestionIndex
        )
    }
    fetchInterview()
    
    }, [])

    useEffect(() => {
        setQuestionStartTime(Date.now());
    }, [currentIndex])

    const handleSubmit = async (answer) => {
        try {
            setLoading(true)

            const currentQuestion =
                interview.questions[currentIndex]

            const duration = Math.floor(
                (Date.now() - questionStartTime) / 1000
            )

            await api.post(
                `/interview/${id}/questions/${currentQuestion.order}`,
                {
                    answer,
                    answerDuration: duration,
                }
            )

            if ( currentIndex + 1 === interview.questions.length ) {
                await api.post( `/interview/${id}/complete`)

                navigate(`/interview-report/${id}`)

                return
            }

            setCurrentIndex(currentIndex + 1)
        } finally {
            setLoading(false)
        }
    }

    if (!interview)
        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        )

    return (
        <div className="min-h-screen bg-base-200 p-8">
            <div className="max-w-4xl mx-auto">
                <InterviewProgress
                    currentQuestion={currentIndex + 1}
                    totalQuestions={
                        interview.questions.length
                    }
                />

                <InterviewQuestionCard
                    question={
                        interview.questions[currentIndex]
                    }
                    loading={loading}
                    onSubmit={handleSubmit}
                />

            </div>
        </div>
    )
}

export default Interview;