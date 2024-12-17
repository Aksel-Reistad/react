import React, { useState, useEffect } from "react";

function TekstKomponent({ activeVersion, saveData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Hent tekstdata fra backend eller VersionData.js
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/data");
        const data = await response.json();
        const versionData = data[activeVersion] || {};
        setTitle(versionData.title || "Default Title");
        setContent(versionData.content || "Default content");
      } catch (error) {
        console.error("Feil ved henting av data:", error);
      }
    };

    fetchData();
  }, [activeVersion]);

  const handleSave = async () => {
    setMessage("Lagrer...");
    await saveData({ version: activeVersion, title, content });
    setMessage("Endringer lagret!");
  };

  return (
    <div className="Side-Tekst">
      <div
        className="Side-Header"
        contentEditable="true"
        onInput={(e) => setTitle(e.currentTarget.innerText)}
        style={{ direction: "rtl", unicodeBidi: "bidi-override" }}
      >
        {title}
      </div>

      <div
        className="Tekst-Boks-Stor"
        contentEditable="true"
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ direction: "rtl", unicodeBidi: "bidi-override" }}
      ></div>

      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        Lagre Endringer
      </button>

      <div style={{ marginTop: "10px", color: "green" }}>{message}</div>
    </div>
  );
}

export default TekstKomponent;
