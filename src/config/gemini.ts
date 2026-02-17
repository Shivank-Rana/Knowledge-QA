import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ VITE_GEMINI_API_KEY is not set. AI features will be disabled.');
}

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function askGemini(question: string, documentContent: string): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const prompt = `You are a helpful assistant. Answer the following question based on the provided document content.

Question: ${question}

Document Content:
${documentContent}

Provide a clear, concise answer based only on the document content. If the answer is not in the document, say so.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error: any) {
    console.error('Gemini API error:', error);
    throw new Error(`AI Error: ${error.message}`);
  }
}

export async function generateAnswerWithAI(
  question: string,
  documents: Array<{ name: string; content: string; id: string }>
): Promise<{ answer: string; sources: Array<{ documentName: string; documentId: string; excerpt: string }> }> {
  if (!genAI) {
    throw new Error('Gemini API key is not configured');
  }

  try {
    // Combine all document content
    const combinedContent = documents
      .map((doc) => `--- Document: ${doc.name} ---\n${doc.content}`)
      .join('\n\n');

    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const prompt = `You are a helpful assistant. Answer the following question based on the provided document contents.

Question: ${question}

Documents:
${combinedContent}

Instructions:
1. Provide a clear, accurate answer based on the documents
2. If the answer is not found in the documents, say so clearly
3. Keep the answer concise and relevant`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    // Find relevant excerpts from documents
    const sources = documents
      .slice(0, 2) // Top 2 documents
      .map((doc) => ({
        documentName: doc.name,
        documentId: doc.id,
        excerpt: doc.content.substring(0, 300) + '...',
      }));

    return {
      answer,
      sources,
    };
  } catch (error: any) {
    console.error('Gemini API error:', error);
    throw new Error(`AI Error: ${error.message}`);
  }
}
