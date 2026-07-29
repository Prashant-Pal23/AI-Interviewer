import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const WelcomeSection = () => {
    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)

    return (
        <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Welcome, {user?.name}! 
                        </h1>
                        <p className="text-base-content/70 mt-3 text-lg">
                            Ready to crack your next interview?
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="btn btn-outline btn-primary" onClick={() => navigate("/resume")} >  Upload Resume</button>

                        <button className="btn btn-primary" onClick={() => navigate("/create-interview")} > Start Interview </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeSection;