import { NextPage } from "next";
import { MouseEventHandler } from "react";

type Props = {
  label: string;
  onClick?: MouseEventHandler<HTMLElement>;
  link?: string;
  type?: string;
};

export const Button: NextPage<Props> = ({ label, onClick, link, type }) => {
  return (
    // conditionals for onclick and link
    <>
      {onClick && type && (
        <button
          className="flex justify-center items-center text-lg border-2 border-solid border-white bg-transparent w-40 h-14
     cursor-pointer select-none rounded transition ease-in-out duration-300
     hover:text-black hover:bg-white hover:-translate-y-1 active:translate-y-0.5"
          onClick={onClick}
        >
          <p>{label}</p>
        </button>
      )}
      {onClick && (
        <button
          className="flex justify-center items-center text-lg border-2 border-solid border-white bg-transparent w-40 h-14
       cursor-pointer select-none rounded transition ease-in-out duration-300
       hover:text-black hover:bg-white hover:-translate-y-1 active:translate-y-0.5"
          onClick={onClick}
        >
          <p>{label}</p>
        </button>
      )}{" "}
    </>
  );
};
