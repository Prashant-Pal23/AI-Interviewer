import { useNavigate } from "react-router-dom";

const UploadedResumeCard = ({ uploadedResume, onReplace }) => {

    const navigate = useNavigate()
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h1 className="text-3xl font-bold">
                    Resume Uploaded
                </h1>
                <div className="divider"></div>

                <div className="bg-base-200 rounded-xl p-6">
                    <h2 className="font-bold text-lg">
                        {uploadedResume.fileName}
                    </h2>
                    <p className="opacity-70 mt-2">
                        Uploaded on{" "}
                        {new Date(uploadedResume.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        className="btn btn-outline"
                        onClick={onReplace}
                    >
                        Replace Resume
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/ats-analysis")}
                    >
                        Analyze Resume
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UploadedResumeCard