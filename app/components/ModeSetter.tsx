"use client";

import { useEffect } from "react";

const ModeSetter = () => {
  useEffect(() => {
    const mode = document.body.getAttribute("data-resume-mode") || "default";

    const styleId = "resume-mode-styles";
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement("style");
    style.id = styleId;

    let css = "";

    if (mode === "lite") {
      css = `
        .full-js { display: none !important; }
      `;
    } else if (mode === "full") {
      css = `
        .lite-js { display: none !important; }
      `;
    } else if (mode === "recent") {
      css = `
        .job:not(.recent-js) { display: none !important; }
        .job-footer.recent-js { display: block !important; }
        .lite-js { display: none !important; }
      `;
    }

    style.textContent = css;
    document.head.appendChild(style);
  }, []);

  return null;
};

export default ModeSetter;
