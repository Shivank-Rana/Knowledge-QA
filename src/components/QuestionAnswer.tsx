import { useState } from 'react';
import { generateAnswerWithAI } from '@/config/gemini';
import { loadDocuments } from '@/lib/documentUtils';

interface Source {
  documentName: string;
  documentId: string;
  excerpt: string;
}

interface QuestionAnswerProps {
  documentsCount: number;
}

export default function QuestionAnswer({ documentsCount }: QuestionAnswerProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    if (documentsCount === 0) {
      setError('Please upload at least one document before asking questions');
      return;
    }

    setLoading(true);
    setError('');
    setAnswer('');
    setSources([]);

    try {
      // Load documents from Supabase
      const documents = await loadDocuments();
      
      if (documents.length === 0) {
        setError('No documents found');
        return;
      }

      // Use Gemini AI to answer
      const result = await generateAnswerWithAI(question, documents);
      setAnswer(result.answer);
      setSources(result.sources);
    } catch (err: any) {
      setError(err.message || 'Failed to get answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          💬 Ask a Question
        </h2>

        <form onSubmit={handleAsk} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to know?
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What are the main points discussed in the documents?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || documentsCount === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Thinking...' : 'Get Answer'}
          </button>
        </form>

        {documentsCount === 0 && (
          <div className="mt-4 text-sm text-amber-600 bg-amber-50 border border-amber-200 px-4 py-3 rounded">
            ⚠️ Please upload documents first before asking questions.
          </div>
        )}
      </div>

      {/* Answer Display */}
      {answer && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            ✨ Answer
          </h3>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {answer}
            </p>
          </div>
        </div>
      )}

      {/* Sources Display */}
      {sources.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            📚 Sources
          </h3>
          <div className="space-y-4">
            {sources.map((source, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <h4 className="font-semibold text-gray-800 mb-2">
                  {source.documentName}
                </h4>
                <p className="text-sm text-gray-600 italic">
                  "{source.excerpt}"
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            💡 These are the document excerpts that were used to generate the answer.
          </div>
        </div>
      )}
    </div>
  );
}
