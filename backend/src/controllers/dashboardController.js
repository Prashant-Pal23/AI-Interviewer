import { getDashboardData } from "../services/dashboardService.js";

export const getDashboard = async (req, res) => {
    try {

        const dashboard = await getDashboardData(req.id);

        return res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};