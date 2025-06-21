import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const generateBio = async () => {
    setLoading(true);
    setBio('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });
    const data = await res.json();
    setBio(data.bio);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">AI Bio Generator</h1>
      <textarea
        className="w-full max-w-lg p-4 border rounded mb-4"
        rows={4}
        placeholder="Tell us a bit about yourself..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={generateBio}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || !input.trim()}
      >
        {loading ? 'Generating...' : 'Generate Bio'}
      </button>
      {bio && (
        <div className="mt-6 w-full max-w-lg bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Your AI Bio:</h2>
          <p>{bio}</p>
        </div>
      )}
    </div>
  );
}
