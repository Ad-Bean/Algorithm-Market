/* eslint-disable @next/next/no-img-element */
import { getItem, postItem, putItem } from '@api/api';
import Upload from '@components/icons/Upload';
import { ItemInformation } from '@interfaces/Items';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {};

function AddItem({}: Props) {
  const [picture, setPicture] = useState<File | null>(null);
  const [picture64, setAvatarb64] = useState<string | null>(null);

  const [tag, setTags] = useState<string[]>([]);
  const [curTag, setCurTag] = useState<string>('');
  const [addTags, setAddTags] = useState<boolean>(false);

  const [input, setInput] = useState<string[]>([]);
  const [curInput, setCurInput] = useState<string>('');

  const [code, setCode] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [brief, setBrief] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [algorithm, setAlgorithm] = useState<string>('');

  const [time, setTime] = useState<number>();
  const [memory, setMemory] = useState<number>();

  const [output, setOutput] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const getItems = async () => {
      try {
        const ret = await getItem(parseInt(id[0]));
        setTags(ret.tag);
        setAvatarb64(ret.picture);
        fetch(ret.picture)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], 'File name', { type: 'image/png' });
            setPicture(file);
          });
        setInput(ret.input);
        setCode(ret.code ?? '');
        setName(ret.name);
        setBrief(ret.brief);
        setIntroduce(ret.introduce);
        setAlgorithm(ret.algorithm);
        setTime(ret.time);
        setMemory(ret.memory);
        setOutput(ret.outputImg ?? false);
      } catch (err) {
        toast.error('获取记录失败');
      }
    };

    getItems();
    return () => {};
  }, [id]);

  const handlePostNewItem = () => {
    if (
      !name ||
      !brief ||
      tag.length === 0 ||
      !picture ||
      !introduce ||
      !algorithm ||
      input.length === 0
    ) {
      toast.error('提交失败，请检查表格');
    }

    const payload: ItemInformation = {
      algorithm: algorithm,
      brief: brief,
      code: code,
      input: input,
      introduce: introduce,
      memory: memory,
      name: name,
      outputImg: output,
      picture: picture64!,
      tag: tag,
      time: time,
    };

    if (id) {
      putItem(parseInt(id[0]), payload)
        .then(() => {
          toast.success('修改记录成功');
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-5 lg:p-12">
            <form action="" className="space-y-4">
              <div>
                {picture ? (
                  <div className="">
                    <img
                      src={URL.createObjectURL(picture)}
                      alt="avatar"
                      className="object-cover object-center w-32 h-32 mx-auto rounded bg-gray-500"
                    />
                    <label
                      htmlFor="picture"
                      className="mx-auto mt-2 cursor-pointer flex w-32 max-w-lg flex-col items-center  border-2 bg-white p-0 text-center"
                    >
                      <p className="mt-0 text-sm text-gray-500 tracking-wide">重新上传</p>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/gif"
                        name="picture"
                        id="picture"
                        className="hidden w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-700"
                        onChange={(e) => {
                          e.preventDefault();
                          if (!e.target.files) return;
                          setPicture(e.target.files[0]);
                          const reader = new FileReader();
                          reader.readAsDataURL(e.target.files[0]);
                          reader.onloadend = () => {
                            setAvatarb64(reader.result as string);
                          };
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="w-full">
                    <label
                      htmlFor="picture"
                      className="mb-2 cursor-pointer flex w-full flex-col items-center rounded-xl border-2 border-dashed border-indigo-400 bg-white p-6 text-center"
                    >
                      <Upload />
                      <p className="mt-2 text-sm text-gray-500 tracking-wide">
                        商品图片：文件类型 PNG, JPG or GIF.{' '}
                      </p>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/gif"
                        name="picture"
                        id="picture"
                        className="hidden w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-100 text-gray-700"
                        onChange={(e) => {
                          e.preventDefault();
                          if (!e.target.files) return;
                          setPicture(e.target.files[0]);
                          const reader = new FileReader();
                          reader.readAsDataURL(e.target.files[0]);
                          reader.onloadend = () => {
                            setAvatarb64(reader.result as string);
                          };
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="商品名字"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                  }}
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="brief">
                  Brief
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="商品简介"
                  rows={2}
                  id="brief"
                  value={brief}
                  onChange={(e) => {
                    e.preventDefault();
                    setBrief(e.target.value);
                  }}
                ></textarea>
              </div>

              <div>
                <div className="pl-1 text-gray-600 text-sm my-0 mb-2 flex">
                  标签：
                  {tag.length > 0 &&
                    tag.map((t, idx) => {
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-500 mx-1"
                        >
                          <p className="whitespace-nowrap text-sm">{t}</p>

                          <button
                            className="-mr-1 ml-1.5 inline-block rounded-full bg-indigo-200 p-0.5 text-indigo-600 transition hover:text-indigo-700"
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setTags(tag.filter((nt) => nt !== t));
                            }}
                          >
                            <span className="sr-only">Remove badge</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-3 w-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </span>
                      );
                    })}
                  <span className="grid w-10 place-content-center">
                    <button
                      onClick={() => setAddTags(!addTags)}
                      type="button"
                      className="rounded-full bg-indigo-600 p-0.5 text-white hover:bg-indigo-700"
                    >
                      <span className="sr-only">Add</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </button>
                  </span>
                </div>

                {addTags && (
                  <div className="flex items-center border-b border-indigo-500 py-2">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-0 leading-tight focus:outline-none border-transparent focus:border-transparent focus:ring-0 text-sm"
                      type="text"
                      placeholder="添加算法标签"
                      aria-label="Full name"
                      value={curTag}
                      onChange={(e) => setCurTag(e.target.value)}
                    />
                    <button
                      className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                      onClick={() => {
                        setTags([...tag, curTag]);
                        setCurTag('');
                      }}
                    >
                      添加
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="introduce">
                  Introduce
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="商品介绍"
                  rows={4}
                  id="introduce"
                  value={introduce}
                  onChange={(e) => {
                    e.preventDefault();
                    setIntroduce(e.target.value);
                  }}
                ></textarea>
              </div>

              <div>
                <label className="sr-only" htmlFor="algorithm">
                  Algorithm
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="商品算法介绍"
                  rows={4}
                  id="algorithm"
                  value={algorithm}
                  onChange={(e) => {
                    e.preventDefault();
                    setAlgorithm(e.target.value);
                  }}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="sr-only" htmlFor="time">
                    Runtime
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="运行时间 ms"
                    type="number"
                    id="time"
                    value={time}
                    onChange={(e) => {
                      e.preventDefault();
                      setTime(+e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="memory">
                    Memory
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="运行内存 KB"
                    type="number"
                    id="memory"
                    value={memory}
                    onChange={(e) => {
                      e.preventDefault();
                      setMemory(+e.target.value);
                    }}
                  />
                </div>

                <div className="">
                  <div className="flex items-center pl-4 rounded-lg border border-gray-200 ">
                    <input
                      id="bordered-checkbox-1"
                      type="checkbox"
                      checked={output}
                      onChange={(e) => setOutput(e.target.checked)}
                      name="bordered-checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded-lg border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
                    />
                    <label
                      htmlFor="bordered-checkbox-1"
                      className="h-[46px] leading-[46px] ml-2 w-full text-sm font-medium text-gray-600"
                    >
                      输出是否包含图片
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="代码"
                  rows={8}
                  id="code"
                  value={code}
                  onChange={(e) => {
                    e.preventDefault();
                    setCode(e.target.value);
                  }}
                ></textarea>
              </div>

              <div>
                <div className="pl-1 text-gray-600 text-sm my-0 mb-2 flex flex-col">
                  输入样例：
                  {input.length > 0 &&
                    input.map((t, idx) => {
                      return (
                        <div className="mt-2" key={idx}>
                          <span className="w-full inline-flex items-center justify-between text-indigo-500 my-1">
                            <p className="whitespace-nowrap text-sm">{t}</p>

                            <button
                              className="-mr-1 ml-1.5 inline-block rounded-full bg-indigo-200 p-0.5 text-indigo-600 transition hover:text-indigo-700"
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setInput(input.filter((nt) => nt !== t));
                              }}
                            >
                              <span className="sr-only">Remove badge</span>

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-3 w-3"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </span>
                        </div>
                      );
                    })}
                </div>

                <div className="flex items-center border-b border-indigo-500 py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-transparent focus:border-transparent focus:ring-0 text-sm"
                    type="text"
                    placeholder="添加输入样例"
                    aria-label="Example input"
                    value={curInput}
                    onChange={(e) => setCurInput(e.target.value)}
                  />
                  <button
                    className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setInput([...input, curInput]);
                      setCurInput('');
                    }}
                  >
                    添加
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-white sm:w-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePostNewItem();
                  }}
                >
                  <span className="font-medium"> 修改商品 </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddItem;
