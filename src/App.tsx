import { useState, useEffect } from 'react';
import DocumentUpload from '@/components/DocumentUpload';
import DocumentList from '@/components/DocumentList';
import QuestionAnswer from '@/components/QuestionAnswer';
import HealthStatus from '@/components/HealthStatus';
import { loadDocuments } from '@/lib/documentUtils';

interface DocumentItem {
  id: string;
  name: string;
  uploaded_at: string;
  content: string;
}

export function App() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upload' | 'ask' | 'health'>('upload');

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const docs = await loadDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUploadSuccess = () => {
    fetchDocuments();
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📚 Knowledge Q&A
          </h1>
          <p className="text-gray-600">
            Your private workspace to upload documents and search answers
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              📤 Upload & Manage
            </button>

            <button
              onClick={() => setActiveTab('ask')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'ask'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              🔍 Ask Questions
            </button>

            <button
              onClick={() => setActiveTab('health')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'health'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              🏥 System Health
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'upload' && (
            <>
              <DocumentUpload onUploadSuccess={handleUploadSuccess} />
              <DocumentList
                documents={documents}
                loading={loading}
                onDelete={handleDelete}
              />
            </>
          )}

          {activeTab === 'ask' && (
            <QuestionAnswer documentsCount={documents.length} />
          )}

          {activeTab === 'health' && <HealthStatus />}
        </div>

        {/* Footer Instructions */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            📖 How to Use
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Step 1: Upload</h3>
              <p>Upload your text documents (.txt, .md, .json).</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Step 2: Search</h3>
              <p>Ask questions and get answers using keyword matching.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Step 3: Review</h3>
              <p>Read directly from the document content used in the answer.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
