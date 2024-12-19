import React, { useState } from "react";

function BildeKomponent({ activeVersion, saveData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!selectedImage) {
      setMessage("Velg et bilde før du lagrer!");
      return;
    }

    const formData = new FormData();
    formData.append("version", activeVersion);
    formData.append("image", selectedImage);

    try {
      setMessage("Lagrer bilde...");
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Bilde lagret!");
        await saveData({ version: activeVersion, imageUrl: data.imageUrl });
      } else {
        setMessage("Feil ved lagring av bilde.");
      }
    } catch (error) {
      console.error("Feil ved bildeopplasting:", error);
      setMessage("En feil oppstod.");
    }
  };

  return (
    <div className="BildeKomponent">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && <img src={previewUrl} alt="Forhåndsvisning" className="Preview-Bilde" />}
      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        Lagre Bilde
      </button>
      <div style={{ marginTop: "10px", color: "green" }}>{message}</div>
    </div>
  );
}

export default BildeKomponent;
