/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import ResultTerminal from "./ResultTerminal";
import Terminal from "./Terminal";

type Props = {
  itemId: number;
  inputs: string[];
};

export default function Playground({ itemId, inputs }: Props) {
  const [openTab, setOpenTab] = useState(1);
  const [result, setResult] = useState("");
  const [image, setImage] = useState("");

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1 ? "text-white bg-violet-600" : "text-violet-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                测试用例
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2 ? "text-white bg-violet-600" : "text-violet-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                执行结果
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3 ? "text-white bg-violet-600" : "text-violet-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                结果图例
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                {itemId && (
                  <Terminal
                    itemId={itemId}
                    setOpenTab={setOpenTab}
                    setResult={setResult}
                    setImage={setImage}
                    inputs={inputs}
                  />
                )}
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <ResultTerminal result={result} />
              </div>
              <div className={"pb-2 " + (openTab === 3 ? "block" : "hidden")} id="link3">
                <ImageCard src={image} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type ImageProps = {
  src: string;
};

const ImageCard = ({ src }: ImageProps) => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-6/12 sm:w-4/12 px-4">
        <img
          src={`data:image/jpeg;base64,${src}`}
          alt="..."
          className="shadow rounded max-w-full h-auto align-middle border-none"
        />
      </div>
    </div>
  );
};
