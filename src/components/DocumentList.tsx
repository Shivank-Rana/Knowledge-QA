import { deleteDocument } from '@/lib/documentUtils';

interface Document {
  id: string;
  name: string;
  uploaded_at: string;
  content: string;
}

interface DocumentListProps {
  documents: Document[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function DocumentList({
  documents,
  loading,
  onDelete,
}: DocumentListProps) {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      const success = await deleteDocument(id);
      if (success) {
        onDelete(id);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📄 Your Documents
        </h2>
        <div className="text-center py-8 text-gray-500">
          Loading documents...
        </div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          📄 Your Documents
        </h2>
        <div className="text-center py-8 text-gray-500">
          No documents uploaded yet. Upload your first document above!
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  const getPreview = (content: string) =>
    content.substring(0, 200) + (content.length > 200 ? '...' : '');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        📄 Your Documents ({documents.length})
      </h2>

      <div className="space-y-4">
        {documents.map(doc => (
          <div
            key={doc.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Uploaded: {formatDate(doc.uploaded_at)}
                </p>
                <p className="text-sm text-gray-500 italic line-clamp-2">
                  {getPreview(doc.content)}
                </p>
              </div>

              <button
                onClick={() => handleDelete(doc.id)}
                className="ml-4 text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
