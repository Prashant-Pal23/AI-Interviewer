import { useEffect, useState } from "react";

import api from "../../services/api";

import HistoryCard from "../../components/history/HistoryCard";

const History = () => {

    const [interviews, setInterviews] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        fetchHistory()

    }, [])

    const fetchHistory = async () => {
        try {
            const response = await api.get("/interview")
            setInterviews(response.data.interviews)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        )
    }
    if (interviews.length === 0) {
        return (
            <div className="text-center mt-20">

                <h2 className="text-2xl font-bold">
                    No Interviews Found
                </h2>

            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-200 p-8">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    Interview History
                </h1>

                <div className="grid gap-6">
                    {
                        interviews.map((interview) => (

                            <HistoryCard
                                key={interview._id}
                                interview={interview}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default History;