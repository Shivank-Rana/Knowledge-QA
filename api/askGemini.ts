import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, documents } = req.body;

    if (!question || !documents?.length) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not set' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const combinedContent = documents
      .map((d: any) => `--- ${d.name} ---\n${d.content}`)
      .join('\n\n');

    const prompt = `
Answer ONLY using the documents.

Question:
${question}

Documents:
${combinedContent}
    `;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    const sources = documents.slice(0, 2).map((doc: any) => ({
      documentName: doc.name,
      documentId: doc.id,
      excerpt:
        doc.content.slice(0, 300) +
        (doc.content.length > 300 ? '...' : ''),
    }));

    return res.status(200).json({ answer, sources });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Gemini failed' });
  }
}
