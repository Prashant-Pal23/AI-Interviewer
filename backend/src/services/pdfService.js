import pdfParse from "pdf-parse/lib/pdf-parse.js"

export const extractTextFromPDF = async (fileBuffer) => {
    const data = await pdfParse(fileBuffer)

    return data.text
}

