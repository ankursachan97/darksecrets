// src/components/Overlay.tsx

import React, { useState, useEffect } from "react";

export default function Overlay() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const prev = localStorage.getItem("darksecrets") || "[]";
      setSaved(JSON.parse(prev));
    } catch {
      setSaved([]);
    }
  }, []);

  const save = () => {
    if (!text.trim()) return;
    const next = [text.trim(), ...saved].slice(0, 6);
    setSaved(next);
    localStorage.setItem("darksecrets", JSON.stringify(next));
    setText("");
  };

  return (
    <div className="overlay">
      <div className="overlay-top">
        <h1 className="dark-title">Dark Secrets</h1>
        <p className="tagline">No names. No logins. Whisper into the void.</p>
      </div>

      <div className="overlay-bottom">
        <div className="box">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Confess your darkest secret..."
            maxLength={800}
          />
          <button onClick={save}>Submit Secret</button>
        </div>

        {saved.length > 0 && (
          <div className="feed">
            {saved.map((s, i) => (
              <div key={i} className="secret">
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
