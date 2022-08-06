import React from "react";
import Link from "next/link";
import NotFound from "@icons/NotFound";

function _404() {
  return (
    <section className="flex items-center h-1/2 sm:p-16 dark:bg-white-900 dark:text-black-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
        <NotFound />
        <p className="text-3xl font-sans font-bold leading-none"> 404 Page NotFound </p>
        <Link href="/">
          <a
            rel="noopener noreferrer"
            className="px-8 py-3 font-semibold rounded dark:bg-deep-purple-accent-400 dark:text-white"
          >
            Back to homepage
          </a>
        </Link>
      </div>
    </section>
  );
}

export default _404;
