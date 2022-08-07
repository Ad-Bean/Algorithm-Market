import React, { useState } from "react";
import ErrorSnackBar from "@components/ErrorSnackBar";

type Props = {
  input: string[] | undefined;
};

export default function ItemInput({ input }: Props) {
  const [message, setMessage] = useState("");

  return (
    <div
      onClick={() => setMessage("")}
      className="bg-gray-100 dark:text-black font-sans rounded-3xl"
    >
      {message ? <ErrorSnackBar message={message} /> : null}
      <div className="container px-6 max-w-4xl py-6 mx-auto shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm dark:text-gray-400"> Jun 1, 2022 </span>
          <a
            rel="noopener noreferrer"
            href="#"
            className="px-2 py-1 font-bold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            C/C++
          </a>
        </div>
        <div className="my-4">
          <a rel="noopener noreferrer" href="#" className="text-2xl font-bold mb-2">
            算法输入 Inputs
          </a>
          {input &&
            input.map((inp, idx) => (
              <p key={idx} className="text-lg mt-2">
                <span className=""> 输入 #{idx + 1} </span>: {inp}
              </p>
            ))}
        </div>
        <div className="mt-4">
          <a rel="noopener noreferrer" href="#" className="text-2xl font-bold mb-2">
            算法输出 Outputs
          </a>
        </div>
      </div>
    </div>
  );
}
