import React from "react";

type Props = {
  result: string;
};

export default function Terminal({ result }: Props) {
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
          <span className="text-green-400">output:~$</span>
          <input
            type="text"
            className="bg-gray-800 w-full mx-auto h-full text-green-200 border-0 focus:border-0 outline-none focus:outline-0 focus:outline-gray-800 ml-0 border-transparent focus:border-transparent focus:ring-0"
            autoFocus
            value={result}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
