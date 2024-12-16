import React from "react";
import ButikSide from "./ButikSide";
import saveEdits from "./Lagring";
function checkEdits() {

    //find out if the user has previously saved edits
    if(localStorage.userEdits!=null)
    document.getElementById("edit").innerHTML = localStorage.userEdits;
    }

export default checkEdits;