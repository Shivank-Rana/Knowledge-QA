import { GoogleGenerativeAI } from '@google/generative-ai';

interface Document {
  name: string;
  content: string;
  id: string;
}

interface RequestBody {
  question: string;
  documents: Document[];
}

interface Source {
  documentName: string;
  documentId: string;
  excerpt: string;
}

interface ResponseData {
  answer: string;
  sources: Source[];
}

interface ErrorResponse {
  error: string;
}

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    const body = req.body as RequestBody;
    const { question, documents } = body;
    
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ 
        error: 'Missing or invalid question parameter' 
      });
    }

    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      return res.status(400).json({ 
        error: 'Missing or invalid documents parameter' 
      });
    }

    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'Gemini API key not configured on server. Check environment variables.' 
      });
    }

    console.log('✅ Starting Gemini API call...');
    console.log(`📄 Processing ${documents.length} documents`);
    console.log(`❓ Question: ${question.substring(0, 50)}...`);

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const MODEL_NAME = 'gemini-2.0-flash';
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Combine documents
    const combinedContent = documents
      .map((doc) => `--- Document: ${doc.name} ---\n${doc.content}`)
      .join('\n\n');

    // Create prompt
    const prompt = `You are a helpful assistant. Answer the following question based on the provided document contents.

Question: ${question}

Documents:
${combinedContent}

Instructions:
1. Provide a clear, accurate answer based on the documents
2. If the answer is not found in the documents, say so clearly
3. Keep the answer concise and relevant`;

    // Call Gemini
    console.log('🤖 Calling Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    console.log('✅ Gemini response received');

    // Extract sources
    const sources: Source[] = documents
      .slice(0, 2)
      .map((doc) => ({
        documentName: doc.name,
        documentId: doc.id,
        excerpt: doc.content.substring(0, 300) + (doc.content.length > 300 ? '...' : ''),
      }));

    // Return response
    const responseData: ResponseData = {
      answer,
      sources,
    };

    console.log('✅ Sending response back to client');
    return res.status(200).json(responseData);

  } catch (error: any) {
    console.error('❌ API Error:', error);
    
    // Handle specific error types
    if (error.message.includes('API_KEY_INVALID') || error.message.includes('INVALID_ARGUMENT')) {
      return res.status(500).json({
        error: 'Invalid Gemini API key. Please check your configuration.',
      });
    }

    if (error.message.includes('PERMISSION_DENIED')) {
      return res.status(500).json({
        error: 'Permission denied. Check your API key and billing.',
      });
    }

    if (error.message.includes('RESOURCE_EXHAUSTED')) {
      return res.status(500).json({
        error: 'API quota exhausted. Please try again later.',
      });
    }

    return res.status(500).json({
      error: `Server error: ${error.message || 'Failed to generate answer'}`,
    });
  }
}