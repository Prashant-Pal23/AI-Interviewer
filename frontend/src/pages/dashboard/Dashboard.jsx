import QuickActions from "../../components/dashboard/QuickActions.jsx";
import RecentInterviews from "../../components/dashboard/RecentInterviews.jsx";
import StatsCards from "../../components/dashboard/StatsCards.jsx";
import WelcomeSection from "../../components/dashboard/WelcomeSection.jsx";

import { useEffect, useState } from "react";
import api from "../../services/api";

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState(null)

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get("/dashboard");

                setDashboardData(response.data.data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchDashboard();
    },[])

    return (
        <div className="bg-base-200 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <WelcomeSection />
                </div>

                <div className="mb-10">
                    <StatsCards dashboardData={dashboardData} />
                </div>

                <div className="mb-10">
                    <QuickActions />
                </div>

                <RecentInterviews interviews={dashboardData?.recentInterviews || [] } />
            </div>
        </div>
    );
};

export default Dashboard;