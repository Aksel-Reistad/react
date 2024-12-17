import React from "react";
import KD from "../Bilder/KD.jpg";

function BildeKomponent() {
  return (
    <div className="Bilde-Padding">
      <img src={KD} className="Hoved-Bilde" alt="noe er feil" />
    </div>
  );
}

export default BildeKomponent;
