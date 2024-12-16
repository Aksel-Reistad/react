import React from "react";
import { changesByVersion } from "./VersionData.js";

function Liste({ activeVersion }) {
  const versionList = changesByVersion[activeVersion]?.list || ["Default item"];

  return (
    <header>
      <ul>
        {versionList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </header>
  );
}

export default Liste;
