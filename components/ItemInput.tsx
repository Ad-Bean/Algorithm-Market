import React, { useState } from "react";
import ErrorSnackBar from "@components/ErrorSnackBar";
import { postInput } from "@api/api";
import { toast, ToastContainer } from "react-toastify";
import { Output } from "@interfaces/Input";

type Props = {
  input: string[] | undefined;
  itemId: number;
};

export default function ItemInput({ input, itemId }: Props) {
  const [loading, setLoading] = useState<boolean[]>(new Array(input?.length));
  const [output, setOutput] = useState<Output[]>(new Array(input?.length));

  const getOutput = async (inp: string, idx: number) => {
    if (!itemId) {
      toast.error("提交错误，ID 错误");
      return;
    }
    const prevState = [...loading];
    prevState[idx] = true;
    setLoading(prevState);

    const res = await postInput({
      input: inp,
      item_id: itemId,
    });

    if (res.code != 0) {
      toast.error(`错误代码 ${res.code}， 请检查输入或重试`);
      prevState[idx] = false;
      setLoading(prevState);
    } else {
      toast.success("提交成功");

      const prev = [...output];
      prev[idx] = res.data!;
      setOutput(prev);

      prevState[idx] = false;
      setLoading(prevState);
    }
  };

  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <div className="bg-gray-100 font-sans rounded-3xl">
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
              测试样例
            </a>
            {input &&
              input.map((inp, idx) => (
                <div className="flex flex-col" key={idx}>
                  <div className="flex w-full justify-between items-center">
                    <p className="text-lg mt-2">
                      <span className=""> 输入 #{idx + 1} </span>: {inp}
                    </p>
                    <button
                      disabled={loading[idx]}
                      onClick={() => getOutput(inp, idx)}
                      className="relative inline-block px-4 py-0 overflow-hidden border border-violet-600 group focus:outline-none focus:ring disabled:bg-slate-400  disabled:border-slate-600"
                    >
                      {!loading && (
                        <span className="absolute inset-y-0 left-0 w-[2px] transition-all bg-violet-600 group-hover:w-full group-active:bg-violet-500"></span>
                      )}
                      <span className="relative text-sm font-medium text-violet-600 group-disabled:text-slate-700  transition-colors group-hover:text-white">
                        提交
                      </span>
                    </button>
                  </div>
                  {loading[idx] && !output[idx] && <LoadingCard />}
                  {!loading[idx] && output[idx] ? (
                    <ResultCard src={output[idx].img} text={output[idx].text} />
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

const LoadingCard = () => {
  return (
    <div className="animate-pulse flex space-x-4 my-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-slate-400 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};

type ResultProps = {
  src: string;
  text: string;
};

const ResultCard = ({ src, text }: ResultProps) => (
  <div className="block overflow-hidden rounded-2xl my-4 w-full">
    <img className="object-cover w-full h-24" src={`data:image/jpeg;base64,${src}`} alt="" />

    <div className="p-4 bg-gray-900 my-4">
      <p className="mt-1 text-xs text-gray-500">{text}</p>
    </div>
  </div>
);
