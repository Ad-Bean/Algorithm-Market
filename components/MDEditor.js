
import Vditor from "vditor/dist/method.min";
import "vditor/dist/index.css";
import React, { useEffect, useRef, useState } from "react";

export default function MDEditor(props) {
  const { value, mde } = props;
  const [vd, setVd] = useState();
  const preview = useRef();

  useEffect(() => {
    if (!mde || !preview) return;

    const vid = mde;
    // const vditor = new Vditor(vid, {
    //   after: () => {
    //     vditor.setValue(value);
    //     setVd(vditor);
    //   },
    //   toolbar: [
    //     // "emoji",
    //     "headings",
    //     "bold",
    //     "italic",
    //     "strike",
    //     "link",
    //     "|",
    //     "list",
    //     "ordered-list",
    //     "check",
    //     "|",
    //     "quote",
    //     "line",
    //     "code",
    //     "inline-code",
    //     "|",
    //     "upload",
    //     "table",
    //     // "|",
    //     // "undo",
    //     // "redo",
    //     "|",
    //     "fullscreen",
    //     "edit-mode",
    //     {
    //       name: "more",
    //       toolbar: ["both", "code-theme", "content-theme", "export", "outline", "preview"],
    //     },
    //   ],
    //   counter: {
    //     enable: true,
    //     type: "统计字数",
    //   },
    //   cache: {
    //     id: mde,
    //   },
    // });
    const render = async () => {
      await Vditor.preview(preview.current, value, {
        mode: "light",
        anchor: 1,
      });
    };

    render();
  }, [value, mde, preview]);

  // return <div id={mde} className="vditor" />;
  return (
    <div
      ref={preview}
      id={mde}
      className="vditor bg-gray-100 dark:text-black font-sans rounded-3xl py-6"
    ></div>
  );
}
