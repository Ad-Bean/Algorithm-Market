import Vditor from "vditor";
import "vditor/dist/index.css";
import React, { MutableRefObject, useEffect, useRef } from "react";

type Props = {
  value: string | undefined;
  mde: string | undefined;
};

function MDEditor({ value, mde }: Props) {
  const preview = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (!mde || !preview || !value || !preview.current) return;

    const render = async () => {
      await Vditor.preview(preview.current!, value, {
        mode: "light",
        anchor: 1,
      });
    };

    render();
  }, [value, mde, preview]);

  return (
    <div
      ref={preview}
      id={mde}
      className="vditor bg-gray-100 dark:text-black font-sans rounded-3xl py-6"
    ></div>
  );
}

export default MDEditor;
