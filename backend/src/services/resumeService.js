import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { extractTextFromPDF } from "./pdfService.js";
import { createResume, findResumeByUserId, updateResumeById } from "../repositories/resumeRepository.js";

export const uploadResume = async (userId, file) => {
    
    let uploadedFile;

    try {  
        const existingResume = await findResumeByUserId(userId)
        
        uploadedFile = await uploadToCloudinary(file, "ai-interview/resumes", "raw")
        
        const extractedText = await extractTextFromPDF(file.buffer);
                
        if(!existingResume) {
            return await createResume({
                user: userId,
                resumeFileUrl: uploadedFile.secure_url,
                cloudinaryPublicId: uploadedFile.public_id,
                fileName: file.originalname,
                extractedText
            })
        }

        const updatedResume = await updateResumeById(
            existingResume._id,
            {
                resumeFileUrl: uploadedFile.secure_url,
                cloudinaryPublicId: uploadedFile.public_id,
                fileName: file.originalname,
                extractedText,

                atsAnalysis: {
                    score: null,
                    jobDescription: null,
                    strengths: [],
                    weaknesses: [],
                    missingSkills: [],
                    suggestions: [],
                    analyzedAt: null,
                },
            }
        )
        if (existingResume.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(
                existingResume.cloudinaryPublicId,
                {
                    resource_type: "raw"
                }
            )
        }
        return updatedResume;
    } catch (error) {

        if (uploadedFile?.public_id) {
            await cloudinary.uploader.destroy(
                uploadedFile.public_id,
                {
                    resource_type: "raw",
                }
            )
        }
        throw error
    }
}


export const getUserResume = async (userId) => {
    return await findResumeByUserId(userId);
};