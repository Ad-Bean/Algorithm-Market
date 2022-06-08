import Vditor from "vditor";
import "vditor/dist/index.css";
import React, { useEffect, useState } from "react";

export default function MDEditor(props) {
  const { value, mde } = props;
  const [vd, setVd] = useState();

  useEffect(() => {
    if (!mde) return;

    const vid = mde;
    const vditor = new Vditor(vid, {
      after: () => {
        vditor.setValue(value);
        setVd(vditor);
      },
      toolbar: [
        // "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "|",
        "upload",
        "table",
        // "|",
        // "undo",
        // "redo",
        "|",
        "fullscreen",
        "edit-mode",
        {
          name: "more",
          toolbar: ["both", "code-theme", "content-theme", "export", "outline", "preview"],
        },
      ],
      counter: {
        enable: true,
        type: "统计字数",
      },
      cache: {
        id: mde,
      },
    });
  }, [value, mde]);

  return <div id={mde} className="vditor" />;
}
