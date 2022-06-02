import React from "react";

function Badget() {
  return (
    <svg
      viewBox="0 0 52 24"
      fill="currentColor"
      className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
    >
      <defs>
        <pattern id="34f481be-159a-4846-821d-9ca19fb6bcc5" x="0" y="0" width=".135" height=".30">
          <circle cx="1" cy="1" r=".7" />
        </pattern>
      </defs>
      <rect fill="url(#34f481be-159a-4846-821d-9ca19fb6bcc5)" width="52" height="24" />
    </svg>
  );
}

export default Badget;
