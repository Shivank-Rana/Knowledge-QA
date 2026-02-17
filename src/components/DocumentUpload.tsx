import { useState, useRef } from 'react';
import { saveDocument } from '@/lib/documentUtils';

interface DocumentUploadProps {
  onUploadSuccess: () => void;
}

export default function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const file = formData.get('file') as File | null;

    if (!file) {
      setError('Please select a file');
      return;
    }

    if (!file.type.startsWith('text/') && !file.name.endsWith('.md') && !file.name.endsWith('.json')) {
      setError('Please upload a text-based file (.txt, .md, .json)');
      return;
    }

    setUploading(true);

    try {
      const content = await file.text();

      if (!content || content.trim().length === 0) {
        setError('File is empty');
        setUploading(false);
        return;
      }

      const result = await saveDocument(file.name, content);

      if (!result) {
        throw new Error('Failed to save document');
      }

      setSuccess(`✅ Successfully uploaded: ${result.name}`);
      form.reset();
      onUploadSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        📤 Upload Document
      </h2>

      <form
        ref={formRef}
        onSubmit={handleFileUpload}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a text file
          </label>
          <input
            type="file"
            name="file"
            accept=".txt,.md,.json"
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              cursor-pointer"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-500">
        💡 Tip: Upload multiple text files to build your searchable knowledge base.
      </div>
    </div>
  );
}
