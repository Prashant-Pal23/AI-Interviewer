const ResumeUploadCard = ({ selectedFile, loading, onFileChange, onUpload }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h1 className="text-3xl font-bold">
                    Upload Resume
                </h1>
                <p className="text-base-content/70">
                    Upload your latest resume in PDF format.
                </p>
                <div className="divider"></div>

                <div className="border-2 border-dashed border-primary rounded-xl p-10 text-center">
                    <h2 className="text-xl font-semibold">
                        Choose Resume
                    </h2>
                    <p className="text-base-content/70 mt-2 mb-6">
                        Only PDF files are supported.
                    </p>
                    <input
                        type="file"
                        accept=".pdf"
                        className="file-input file-input-bordered file-input-primary w-full max-w-md"
                        onChange={onFileChange}
                    />
                    {
                        selectedFile && (
                            <div className="mt-6">
                                <p className="font-semibold">
                                    Selected File
                                </p>
                                <p className="text-primary mt-2">
                                    {selectedFile.name}
                                </p>
                            </div>
                        )
                    }
                </div>
                <div className="flex justify-end mt-8">
                    <button
                        className="btn btn-primary"
                        disabled={loading || !selectedFile}
                        onClick={onUpload}
                    >
                        {
                            loading
                                ? "Uploading..."
                                : "Upload Resume"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ResumeUploadCard;