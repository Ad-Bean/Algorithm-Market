import React, { useEffect, useState } from "react";
import { getInput, getOutput } from "@api/api";
import SnackBar from "@components/SnackBar";

export default function ItemInput(props) {
  const { id } = props;
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    const getInputs = async () => {
      try {
        const ret = await getInput(id);
        setInputs(ret);
        const outs = [];
        for (let i = 0; i < ret.length; i++) {
          const output_r = await getOutput(id, ret[i].id);
          outs.push(output_r);
        }
        setOutputs(outs);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getInputs();
    return () => {
      setMessage("");
    };
  }, [id]);

  return (
    <div
      onClick={() => setMessage("")}
      className="bg-gray-100 dark:text-black font-sans rounded-3xl"
    >
      {message ? <SnackBar message={message} /> : null}
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
          {inputs &&
            inputs.map((inp, idx) => (
              <p key={idx} className="text-lg mt-2">
                输入 #{inp.id}: {inp.input}
              </p>
            ))}
        </div>
        <div className="mt-4">
          <a rel="noopener noreferrer" href="#" className="text-2xl font-bold mb-2">
            算法输出 Outputs
          </a>
          {outputs ? (
            outputs.map((out, idx) => (
              <p key={idx} className="text-lg mt-2">
                {out.output ? `输出 #${out.input_id}: ${out.output}` : "暂无输出"}
              </p>
            ))
          ) : (
            <p> 暂无输出 </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <a
            rel="noopener noreferrer"
            href="#"
            className="hover:underline text-sm dark:text-violet-400"
          >
            查看完整样例
          </a>
        </div>
      </div>
    </div>
  );
}
