import React, { useEffect, useState } from "react";
import Vditor from "vditor";
import "vditor/dist/index.css";

type Props = {
  value: string | undefined;
  mde: string | undefined;
};

function MDPreview({ value, mde }: Props) {
  const [vd, setVd] = useState<Vditor>();

  useEffect(() => {
    if (!mde || !value) return;

    const vid = mde;
    const vditor = new Vditor(vid, {
      after: () => {
        vditor.setValue(value!);
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
        type: "markdown",
      },
      cache: {
        id: mde,
      },
    });
  }, [value, mde]);

  return <div id={mde} className="vditor" />;
}

export default MDPreview;
