// // ButikSide.js
// import React, { useState, useEffect } from "react";
// import "../App.css";
// import KD from "../Bilder/KD.jpg";
// import { changesByVersion } from "./VersionData.js";

// function ButikSide({ activeVersion }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Fetch the title and content specific to the active version
//     const versionData = changesByVersion[activeVersion] || {};
//     setTitle(versionData.title || "Default Title");
//     setContent(versionData.content || "Default text for this version.");
//   }, [activeVersion]);

//   const saveEdits = () => {
//     // Save edits specific to the current version
//     if (changesByVersion[activeVersion]) {
//       changesByVersion[activeVersion].title = title;
//       changesByVersion[activeVersion].content = content;
//     }
//     setMessage("Edits saved!");
//   };

//   return (
//     <header>
//       <div className="Bilde-Padding">
//         <span>
//           <img src={KD} className="Hoved-Bilde" alt="noe er feil" />
//         </span>
//         <div className="Side-Tekst">
//           <div
//             className="Side-Header"
//             contentEditable="true"
//             style={{ direction: "rtl", unicodeBidi: "bidi-override"}}
//             onInput={(e) => setTitle(e.currentTarget.innerText)}
//           >
//             {title}
//           </div>
//           <div
//             className="Tekst-Boks-Stor"
//             id="edit"
//             contentEditable="true"
//             style={{ direction: "rtl", unicodeBidi: "bidi-override"}}
//             onInput={(e) => setContent(e.currentTarget.innerHTML)}
//             dangerouslySetInnerHTML={{ __html: content }}
//           ></div>
//           <button
//             onClick={saveEdits}
//             style={{marginTop: "10px", padding: "10px 20px" }}
//           >
//             Lagre Endringer
//           </button>
//           <div id="update" style={{ marginTop: "10px", color: "green" }}>
//             {message}
//           </div>
//         </div>
//       </div>

//       <div className="LIT-Padding">
//         <div className="Tekst-Boks-Små">sad</div>
//         <div className="Tekst-Boks-Små">ads</div>
//       </div>

//       <div className="LIT-Padding">
//         <div className="Tekst-Boks">ads</div>
//       </div>
//     </header>
//   );
// }

// export default ButikSide;




import React from "react";
import BildeKomponent from "./BildeKomponent";
import TekstKomponent from "./TekstKomponent";

function ButikSide({ activeVersion }) {
  const saveData = async ({ version, title, content }) => {
    try {
      const response = await fetch("http://localhost:5000/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version, title, content }),
      });
      return await response.json();
    } catch (error) {
      console.error("Feil ved lagring:", error);
    }
  };

  return (
    <div className="Display-flex">
      <BildeKomponent />
      <TekstKomponent activeVersion={activeVersion} saveData={saveData} />
    </div>
  );
}

export default ButikSide;
