import { useState, useEffect } from 'react';
import { checkHealth } from '@/lib/documentUtils';

interface HealthCheck {
  status: string;
  message: string;
}

interface HealthData {
  status: string;
  timestamp: string;
  checks: {
    backend: HealthCheck;
    database: HealthCheck;
    llm: HealthCheck; // Added LLM
  };
}

export default function HealthStatus() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHealth = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await checkHealth();
      setHealth(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch health status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'ok':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '⚠️';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🏥 System Health
        </h2>
        <div className="text-center py-8 text-gray-500">Checking system health...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🏥 System Health
        </h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          ❌ {error}
        </div>
        <button
          onClick={fetchHealth}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!health) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          🏥 System Health
        </h2>
        <button
          onClick={fetchHealth}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Overall Status */}
      <div className={`mb-6 p-4 rounded-lg border ${getStatusColor(health.status)}`}>
        <div className="flex items-center justify-between">
          <span className="font-semibold">Overall Status:</span>
          <span className="font-bold uppercase">
            {getStatusEmoji(health.status)} {health.status}
          </span>
        </div>
        <div className="text-sm mt-1 opacity-75">
          Last checked: {new Date(health.timestamp).toLocaleString()}
        </div>
      </div>

      {/* Individual Checks */}
      <div className="space-y-4">
        {/* Backend */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">🖥️ Backend</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(health.checks.backend.status)}`}>
              {getStatusEmoji(health.checks.backend.status)} {health.checks.backend.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">{health.checks.backend.message}</p>
        </div>

        {/* Database */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">💾 Database (Supabase)</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(health.checks.database.status)}`}>
              {getStatusEmoji(health.checks.database.status)} {health.checks.database.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">{health.checks.database.message}</p>
        </div>

        {/* LLM Connection */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">🤖 LLM Connection</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(health.checks.llm.status)}`}>
              {getStatusEmoji(health.checks.llm.status)} {health.checks.llm.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">{health.checks.llm.message}</p>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
        <p className="font-medium mb-2">📊 What this means:</p>
        <ul className="space-y-1 ml-4 list-disc">
          <li><strong>Backend:</strong> The web server is running and accepting requests</li>
          <li><strong>Database:</strong> Supabase PostgreSQL is accessible for storing documents</li>
          <li><strong>LLM:</strong> Your language model API is reachable and responding</li>
        </ul>
      </div>
    </div>
  );
}
