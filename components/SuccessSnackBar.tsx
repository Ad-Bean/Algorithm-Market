import React from "react";

function SuccessSnackBar(props) {
  const { message } = props;

  return (
    <div className="absolute inset-x-0 top-16 w-96 h-8 mx-auto">
      <div
        className="
      flex items-center p-2 
      space-x-4 rounded-md border-2
    dark:bg-white dark:text-black-100 border-teal-500"
      >
        <div className="flex items-center self-stretch justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-10 h-10 fill-teal-500"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <span> {message} </span>
      </div>
    </div>
  );
}

export default SuccessSnackBar;
