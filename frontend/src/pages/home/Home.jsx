import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="hero min-h-[80vh]">
            <div className="hero-content text-center">
                <div className="max-w-2xl">
                    <h1 className="text-6xl font-bold">
                        Ace Your Next Interview with AI
                    </h1>

                    <p className="py-6 text-lg">
                        Practice AI-powered interviews, analyze your resume,
                        improve your ATS score, and prepare for your dream job.
                    </p>

                    <button className="btn btn-primary btn-lg" onClick={() => navigate("/login")} >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;