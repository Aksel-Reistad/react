// App.js
import React, { useState } from "react";
import TopBar from "./Kode.js/Topbar.js";
import ButikSide from "./Kode.js/ButikSide.js";
import Liste from "./Kode.js/ListeMeny.js";
import { versions } from "./Kode.js/VersionData.js";
import "./App.css";

function App() {
  const [activeVersion, setActiveVersion] = useState("version1"); // State for active version

  return (
    <header className="Background">
      <TopBar />
      <br />
      <br />
      <br />
      <br />

      {/* Dropdown to switch between versions */}
      <div>
        <label htmlFor="version-select">Select Version: </label>
        <select
          id="version-select"
          value={activeVersion}
          onChange={(e) => setActiveVersion(e.target.value)}
        >
          {Object.keys(versions).map((version) => (
            <option key={version} value={version}>
              {version}
            </option>
          ))}
        </select>
      </div>

      {/* Pass the active version to child components */}
      <Liste activeVersion={activeVersion} />
      <ButikSide activeVersion={activeVersion} />
    </header>
  );
}

export default App;
