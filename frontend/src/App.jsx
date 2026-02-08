import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadAudio() {
    if (!file) {
      setResult("❌ Please choose an audio file first.");
      return;
    }

    setLoading(true);
    setResult("Uploading...");

    try {
      const form = new FormData();
      form.append("audio", file); // must match upload.single("audio") in backend

      const res = await fetch("http://localhost:5000/api/upload-audio", {
        method: "POST",
        body: form,
      });

      const text = await res.text(); // read raw text first

      // Try parse JSON, otherwise show the HTML/error text
      try {
        const data = JSON.parse(text);
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
      <h1>🎙️ Medical Transcription App</h1>

      <p>Step 8: Upload audio to backend</p>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={uploadAudio} disabled={loading}>
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
        }}
      >
        {result}
      </pre>
    </div>
  );
}
