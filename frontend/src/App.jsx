import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 2 (temporary): store URL returned by backend after upload
  const [transcript, setTranscript] = useState("");

  async function uploadAudio() {
    if (!file) {
      setResult("❌ Please choose an audio file first.");
      return;
    }

    setLoading(true);
    setResult("Uploading...");
    setTranscript("");

    try {
      const form = new FormData();
      // MUST match multer upload.single("audio") in backend
      form.append("audio", file);

      const res = await fetch("http://localhost:5000/api/upload-audio", {
        method: "POST",
        body: form,
      });

      const text = await res.text(); // read raw text first

      // Try parse JSON, otherwise show HTML/error text
      try {
        const data = JSON.parse(text);

        // If backend returns { ok, filename, url }
        if (data?.url) {
          setTranscript(data.url);
        }

        setResult("✅ Upload success:\n" + JSON.stringify(data, null, 2));
      } catch {
        setResult("❌ Backend did not return JSON:\n\n" + text);
      }
    } catch (e) {
      setResult("❌ Upload failed: " + String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: 6 }}>🎙️ Medical Transcription App</h1>

      <p style={{ marginTop: 0, opacity: 0.85 }}>
        Step 8: Upload audio to backend
      </p>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <div style={{ marginTop: 12 }}>
        <button
          onClick={uploadAudio}
          disabled={loading}
          style={{
            padding: "10px 14px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload Audio"}
        </button>
      </div>

      <pre
        style={{
          marginTop: 16,
          padding: 12,
          background: "#111",
          color: "#0f0",
          whiteSpace: "pre-wrap",
          borderRadius: 8,
        }}
      >
        {result}
      </pre>

      {transcript && (
        <div style={{ marginTop: 16 }}>
          <h3>Transcript (temporary)</h3>
          <p style={{ marginTop: 6, opacity: 0.85 }}>
            Currently showing the uploaded file URL (later we’ll replace this
            with real text transcription).
          </p>

          <a href={transcript} target="_blank" rel="noreferrer">
            {transcript}
          </a>
        </div>
      )}
    </div>
  );
}
