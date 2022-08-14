import { postInput } from "@api/api";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  itemId: number;
  setOpenTab: Function;
};

export default function Terminal({ itemId, setOpenTab }: Props) {
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
        setOpenTab(2);
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
            />
          </form>
        </div>
      </div>
    </div>
  );
}
