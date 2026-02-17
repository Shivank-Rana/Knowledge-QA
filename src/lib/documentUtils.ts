import { supabase, Document, Source } from '@/config/supabase';

/**
 * Fuzzy match score calculation
 */
function fuzzyMatchScore(text: string, query: string): number {
  const textLower = text.toLowerCase();
  const queryWords = query.toLowerCase().split(/\W+/).filter(Boolean);

  let score = 0;
  for (const word of queryWords) {
    if (textLower.includes(word)) score++;
  }
  return score;
}

/**
 * Load all documents from Supabase
 */
export async function loadDocuments(): Promise<Document[]> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error loading documents:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
}

/**
 * Get document by ID
 */
export async function getDocument(id: string): Promise<Document | null> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error getting document:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
}

/**
 * Save a new document
 */
export async function saveDocument(
  name: string,
  content: string
): Promise<Document | null> {
  try {
    const document = {
  id: crypto.randomUUID(),
  name,
  content,
  uploaded_at: new Date().toISOString(),
};


    const { data, error } = await supabase
      .from('documents')
      .insert([document])
      .select()
      .single();

    if (error) {
      console.error('Error saving document:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error saving document:', error);
    return null;
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting document:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
}

/**
 * Answer a question based on documents
 */
export async function answerQuestion(question: string): Promise<{
  answer: string;
  sources: Source[];
}> {
  try {
    const documents = await loadDocuments();

    if (!documents.length) {
      return {
        answer: 'No documents available. Upload documents first.',
        sources: [],
      };
    }

    const matches: {
      documentId: string;
      documentName: string;
      excerpt: string;
      relevance: number;
    }[] = [];

    for (const doc of documents) {
      // Split into logical blocks
      const blocks = doc.content
        .split(/\n\s*\n/)
        .map(b => b.trim())
        .filter(Boolean);

      for (const block of blocks) {
        const score = fuzzyMatchScore(block, question);

        if (score > 0) {
          matches.push({
            documentId: doc.id,
            documentName: doc.name,
            excerpt: block.substring(0, 300),
            relevance: Math.min(score / 5, 1),
          });
        }
      }
    }

    matches.sort((a, b) => b.relevance - a.relevance);

    if (!matches.length) {
      return {
        answer: 'No relevant information found in the uploaded documents.',
        sources: [],
      };
    }

    const topMatches = matches.slice(0, 3);

    const answer = topMatches
      .map(
        (m, i) =>
          `${i + 1}. From "${m.documentName}":\n${m.excerpt}`
      )
      .join('\n\n');

    const sources: Source[] = topMatches.map(m => ({
      documentId: m.documentId,
      documentName: m.documentName,
      excerpt: m.excerpt,
      relevance: m.relevance,
    }));

    return { answer, sources };
  } catch (error) {
    console.error('Error answering question:', error);
    return {
      answer: 'Error processing your question. Please try again.',
      sources: [],
    };
  }
}

/**
 * Check system health
 */
export async function checkHealth(): Promise<{
  status: string;
  timestamp: string;
  checks: {
    backend: { status: string; message: string };
    database: { status: string; message: string };
    llm: { status: string; message: string }; // added LLM
  };
}> {
  try {
    // Database check
    const { error } = await supabase.from('documents').select('count');
    const dbStatus = error ? 'error' : 'ok';
    const dbMessage = error
      ? 'Database connection failed'
      : 'Supabase database is accessible';

    // LLM check
    let llmCheck = { status: 'ok', message: 'LLM is responding' };
    try {
      const res = await fetch('/api/llm/ping'); // your LLM ping route
      if (!res.ok) throw new Error('LLM unreachable');
    } catch (err: any) {
      llmCheck = { status: 'error', message: err.message || 'LLM unreachable' };
    }

    const overallStatus = [dbStatus, llmCheck.status].some(s => s === 'error') ? 'error' : 'ok';

    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks: {
        backend: { status: 'ok', message: 'Backend is running' },
        database: { status: dbStatus, message: dbMessage },
        llm: llmCheck,
      },
    };
  } catch (error) {
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
      checks: {
        backend: { status: 'error', message: 'Backend failed' },
        database: { status: 'error', message: 'Database check failed' },
        llm: { status: 'error', message: 'LLM check failed' },
      },
    };
  }
}
