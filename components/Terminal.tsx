import { postInput } from "@api/api";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  itemId: number;
  inputs: string[];
  setOpenTab: Function;
  setResult: Function;
  setImage: Function;
};

export default function Terminal({ itemId, inputs, setOpenTab, setResult, setImage }: Props) {
  const [input, setInput] = useState("");

  const postJudge = async (e: FormEvent) => {
    e.preventDefault();

    postInput({
      input: input,
      item_id: itemId,
    }).then((res) => {
      if (res.code != 0) {
        toast.error(`错误代码 ${res.code}， 请检查输入或重试`);
      } else {
        toast.success("提交成功");
        setResult(res.data?.text);
        setImage(res.data?.img);
        setTimeout(() => {
          setOpenTab(2);
        }, 500);
      }
    });
  };

  return (
    <div className="w-full">
      <div
        className="coding inverse-toggle px-5 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased 
                    bg-gray-800 pb-6 pt-4 rounded-lg leading-normal overflow-hidden"
      >
        <div className="top mb-2 flex">
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
          <div className="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="mt-4 flex items-center">
          <span className="text-green-400">input:~$</span>
          <form onSubmit={postJudge} className="w-full pl-0">
            <input
              type="text"
              className="bg-gray-800 w-full mx-auto h-full text-green-200 border-0 focus:border-0 outline-none focus:outline-0 focus:outline-gray-800 ml-0 border-transparent focus:border-transparent focus:ring-0"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </form>
        </div>
      </div>
      <div className="flex mt-2 justify-between items-center">
        <div className="relative group peer">
          <button
            className="bg-violet-500 text-white active:bg-violet-600 font-semibold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex flex-row justify-between items-center flex-nowrap whitespace-nowrap"
            type="button"
          >
            <p>填入样例</p>
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          <ul className="drop-down invisible peer-hover:visible group-hover:visible transition-all ease-in-out w-full absolute top-9 -left-0 z-50 shadow-indigo-500/40 text-sm text-white rounded-lg p-1 antialiased border-[#e7ebf0] border bg-violet-500/40">
            {inputs &&
              inputs.map((inp, idx) => (
                <li
                  onClick={() => {
                    setInput(inp);
                  }}
                  key={idx}
                  className="p-1 cursor-pointer hover:bg-violet-500 hover:rounded-lg"
                >
                  {inp}
                </li>
              ))}
          </ul>
        </div>
        <div className="flex">
          <button
            onClick={postJudge}
            className="bg-violet-500 text-white active:bg-violet-600 font-semibold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex flex-row justify-between items-center flex-nowrap whitespace-nowrap hover:active:bg-violet-600"
            type="button"
          >
            <p>提交测试</p>
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
