import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  role: string;
  id: number;
  brief: string;
  name: string;
  picture: string;
  tag: string[];
};

function Card({ role, id, brief, name, picture, tag }: Props) {
  const router = useRouter();

  const readMore = () => {
    router.push(`/algorithm/${id}`);
  };

  const [valid, setValid] = useState(true);
  useEffect(() => {
    checkBase64(picture);
  }, [picture]);

  const checkBase64 = (src: string) => {
    const _img = document.createElement('img');
    _img.src = src;
    _img.onerror = () => {
      setValid(false);
    };
  };

  return (
    <div className="mx-auto w-full duration-300 transform bg-white hover:-translate-y-2 max-w-xs rounded-md shadow-md ">
      <div className="flex justify-center items-center justify-items-center object-cover object-center mx-auto w-full rounded-t-md ">
        <Image
          width={160}
          height={160}
          className="dark:bg-gray-100 text-center"
          alt="picture"
          src={(valid && picture) || 'https://source.unsplash.com/50x50/?portrait'}
        />
      </div>

      <div className="shadow-sm flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-wide w-full overflow-hidden whitespace-nowrap text-ellipsis h-12">
            {name}
          </h2>
          <p className="w-full overflow-hidden whitespace-pre-nowrap text-ellipsis h-14">{brief}</p>
          <p className=" text-sm dark:text-gray-700 w-full h-8">
            标签：
            {tag &&
              tag.map((t, idx) => (
                <span key={idx} className="text-indigo-300 cursor-pointer hover:text-indigo-600">
                  {t}
                  {','}{' '}
                </span>
              ))}
          </p>
        </div>
        <button
          type="button"
          onClick={readMore}
          className="transition duration-200 hover:bg-violet-700 flex items-center justify-center w-full p-2 font-semibold tracking-wide rounded-md dark:bg-violet-400 dark:text-gray-100"
        >
          阅读
        </button>
      </div>
    </div>
  );
}

export default Card;
