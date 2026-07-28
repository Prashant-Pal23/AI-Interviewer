import {
    getInterviewsByUser,
    getResumeByUser,
} from "../repositories/dashboardRepository.js";

export const getDashboardData = async (userId) => {

    const resume = await getResumeByUser(userId);

    const interviews = await getInterviewsByUser(userId);

    const completedInterviews = interviews.filter(
        (interview) => interview.status === "Completed"
    );

    const averageScore =
        completedInterviews.length > 0
            ? Math.round(
                  completedInterviews.reduce(
                      (sum, interview) => sum + (interview.overallScore || 0),
                      0
                  ) / completedInterviews.length
              )
            : 0;

    return {
        resumeUploaded: !!resume,

        latestATSScore: resume?.atsAnalysis?.score ?? null,

        completedInterviews: completedInterviews.length,

        averageScore,

        recentInterviews: interviews.slice(0, 5),
    };
};