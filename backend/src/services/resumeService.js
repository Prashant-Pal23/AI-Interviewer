import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { extractTextFromPDF } from "./pdfService.js";
import { createResume, findResumeByUserId, updateResumeById } from "../repositories/resumeRepository.js";

export const uploadResume = async (userId, file) => {
    
    try {  
        const existingResume = await findResumeByUserId(userId)
        
        const uploadedFile = await uploadToCloudinary(file);
        
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

        await cloudinary.uploader.destroy(
            existingResume.cloudinaryPublicId,
            {
                resource_type: "raw"
            }
        )

        return await updateResumeById(existingResume._id, {
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
            }
        })

    } catch (error) {
        if (uploadedFile?.public_id) {
            await cloudinary.uploader.destroy(
                uploadedFile.public_id,
                {
                    resource_type: "raw"
                }
            );
        }
        throw error;
    }
}