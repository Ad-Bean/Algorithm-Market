import React, { useEffect, useState } from "react";
import { getInput, getOutput } from "@api/api";

export default function ItemInput(props) {
  const { id } = props;
  const [inputs, setInputs] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getItems = async () => {
      try {
        const ret = await getInput(id);
        setInputs(ret);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getItems();
    return () => {
      setMessage("");
    };
  }, [id]);

  return (
    <div className="bg-gray-100 dark:text-black font-sans rounded-3xl">
      <div className="container px-10 max-w-4xl py-6 mx-auto shadow-sm">
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
          {inputs &&
            inputs.map((inp, idx) => (
              <p key={idx} className="text-lg mt-2">
                输入#{inp.id}: {inp.input}
              </p>
            ))}
        </div>
        <div className="mt-4">
          <a rel="noopener noreferrer" href="#" className="text-2xl font-bold mb-2">
            算法输出 Outputs
          </a>
          {inputs &&
            inputs.map((inp, idx) => (
              <p key={idx} className="text-lg mt-2">
                {" "}
                输入#{inp.id}: {inp.input}
              </p>
            ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <a
            rel="noopener noreferrer"
            href="#"
            className="hover:underline text-sm dark:text-violet-400"
          >
            查看完整输入
          </a>
        </div>
      </div>
    </div>
  );
}
