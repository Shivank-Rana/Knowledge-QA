import { useState } from 'react';
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
      const documents = await loadDocuments();

      if (!documents.length) {
        setError('No documents found');
        return;
      }

      // ✅ CALL VERCEL API
      const res = await fetch('/api/askGemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, documents }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gemini error');
      }

      setAnswer(data.answer);
      setSources(data.sources);
    } catch (err: any) {
      setError(err.message || 'Failed to get answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">💬 Ask a Question</h2>

        <form onSubmit={handleAsk} className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about the documents..."
            className="w-full p-3 border rounded"
            rows={3}
            disabled={loading}
          />

          {error && <div className="text-red-600">❌ {error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            {loading ? 'Thinking...' : 'Get Answer'}
          </button>
        </form>
      </div>

      {answer && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">✨ Answer</h3>
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      {sources.length > 0 && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">📚 Sources</h3>
          {sources.map((s, i) => (
            <div key={i} className="mb-3">
              <strong>{s.documentName}</strong>
              <p className="text-sm italic">{s.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
