import { useEffect, useState } from "react";
import Card from "./Card";
import Badget from "./icons/Badget";
import SnackBar from "./SnackBar";
import { getList } from "../pages/api/api";
import Link from "next/link";

export const Content = () => {
  const [items, setItems] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getLists = async () => {
      try {
        const ret = await getList();
        setItems(ret);
      } catch (err) {
        setMessage(err.message);
      }
    };
    getLists();

    return () => {
      setMessage("");
    };
  }, []);

  const closeSnackBar = () => {
    if (message) {
      setMessage("");
    }
  };

  return (
    <>
      {message ? <SnackBar message={message} /> : null}
      <div
        onClick={closeSnackBar}
        className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      >
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Algorithm Market
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <Badget />
              <span className="relative">中山大学 </span>
            </span>{" "}
            算法超市项目
          </h2>
          <p className="text-base text-gray-700 md:text-lg">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            rem aperiam, eaque ipsa quae.
          </p>
        </div>
        <div className="grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-4 sm:grid-cols-2">
          {items &&
            items.map((item, idx) => {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  tag={item.tag}
                  name={item.name}
                  brief={item.brief}
                />
              );
            })}
        </div>

        <div className="text-center">
          <Link href="/market">
            <a className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
              Learn more
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
