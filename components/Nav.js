import Icon from "./icons/Icon";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="sticky top-0 z-50 h-16 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <Link href="/">
          <a className="inline-flex items-center">
            <Icon />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              算法超市
            </span>
          </a>
        </Link>

        <ul className="flex items-center space-x-8 lg:flex">
          <li>
            <Link href="/algorithm">
              <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                算法
              </a>
            </Link>
          </li>
          <li>
            <Link href="/market">
              <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                超市
              </a>
            </Link>
          </li>
          <li>
            <Link href="/pricing">
              <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                价格
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                关于
              </a>
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <a
                className="inline-flex items-center justify-center h-8 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign in"
                title="Sign in"
              >
                登录
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
